"use client";
import Chart from "chart.js/auto";
import { useEffect, useId, useState } from "react";

const LeavesGraph = () => {
  const id = useId();
  const [leaveData, setLeaveData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Fetch the leave data for the last 30 days
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const startDate = formatDate(thirtyDaysAgo);
    const endDate = formatDate(today);

    try {
      const response = await fetch(
        `/api/leave?startDate=${startDate}&endDate=${endDate}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      // Format the data for the leave table
      const formattedData = formatLeaveData(data.data, thirtyDaysAgo, today);
      setLeaveData(formattedData);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const formatLeaveData = (data, startDate, endDate) => {
    const formattedData = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = formatDate(currentDate);
      const count = data.reduce((total, item) => {
        const itemStartDate = new Date(item.startDate);
        const itemEndDate = new Date(item.endDate);
        if (
          itemStartDate.toISOString().startsWith(dateString) ||
          itemEndDate.toISOString().startsWith(dateString)
        ) {
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
    // Create the chart once the leave data is available
    if (leaveData.length > 0) {
      createChart();
    }
  }, [leaveData]);

  const createChart = () => {
    const ctx = document.getElementById(id).getContext("2d");

    // Extract dates and leave counts for the last 30 days
    const labels = leaveData.map((item) => {
      const date = new Date(item.date);
      return `${date.getUTCDate()}`;
    });
    const counts = leaveData.map((item) => item.count);

    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Number of Leaves",
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

  useEffect(() => {
    // Add a resize event listener to handle chart responsiveness
    const resizeHandler = () => {
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

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <canvas id={id} width="400" height="200" />
    </div>
  );
};

export default LeavesGraph;
