// components/AttendanceGraph.js
"use client";
import Chart from "chart.js/auto";
import { useEffect, useId, useState } from "react";

const AttendanceGraph = () => {
  const id = useId();
  const [attendanceData, setAttendanceData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Fetch the attendance data for the last 30 days
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const startDate = formatDate(thirtyDaysAgo);
    const endDate = formatDate(today);

    try {
      const response = await fetch(
        `/api/attendance?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      // Format the data for the attendance graph
      const formattedData = formatAttendanceData(
        data.data,
        thirtyDaysAgo,
        today
      );

      setAttendanceData(formattedData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formatAttendanceData = (data, startDate, endDate) => {
    const formattedData = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = formatDate(currentDate);
      const count = data.reduce((total, item) => {
        const itemDate = new Date(item.date);
        if (itemDate.toISOString().startsWith(dateString)) {
          return total + 1;
        }
        return total;
      }, 0);

      formattedData.push({
        date: dateString,
        count,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return formattedData;
  };

  useEffect(() => {
    // Create the chart once the attendance data is available
    if (attendanceData.length > 0) {
      createChart();
    }
  }, [attendanceData]);

  useEffect(() => {
    // Add a resize event listener to handle chart responsiveness
    const resizeHandler = () => {
      console.log("resize event");
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    window.addEventListener("resize", resizeHandler);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [chartInstance]);

  const createChart = () => {
    const ctx = document.getElementById(id).getContext("2d");

    // Extract dates and attendance counts for the last 30 days
    const labels = attendanceData.map((item) => {
      const date = new Date(item.date);
      return `${date.getUTCDate()}`;
    });
    const counts = attendanceData.map((item) => item.count);

    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Number of Employees",
            data: counts,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            labels: labels,
          },
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
        responsive: true, // Set the chart to be responsive
        maintainAspectRatio: false,
      },
    });

    setChartInstance(newChartInstance);
  };

  return (
    <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
      <canvas id={id} width="400" height="200" />
    </div>
  );
};

export default AttendanceGraph;
