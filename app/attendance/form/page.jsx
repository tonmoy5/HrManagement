"use client";
import AttendanceForm from "@components/AttendanceForm";
import AttendanceLogTable from "@components/AttendanceLogTable";
import { getAttendanceData } from "@utils/api/attendance";
import { getEmployeesData } from "@utils/api/employee";
import { useEffect, useState } from "react";

const AttendanceFormPage = () => {
  const [employeesData, setEmployeesData] = useState({ data: [] });
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch employees data
    getEmployeesData()
      .then((data) => setEmployeesData(data))
      .catch((error) => {
        console.error("Error fetching employees data:", error);
        // Handle the error as needed
      });

    // Fetch attendance data with specific parameters
    const attendanceParams = {
      limit: 10,
    };

    getAttendanceData(attendanceParams)
      .then((data) => setAttendanceData(data.data))
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        // Handle the error as needed
      });
  }, []);

  return (
    <section className="p-5 bg-white rounded shadow">
      <h1 className="font-bold text-lg mb-3 blue_gradient w-max">
        Attendance Form
      </h1>
      <AttendanceForm
        employees={employeesData.data}
        setAttendanceData={setAttendanceData}
      />
      <h3 className="text-lg font-bold mt-5 mb-3">Attendance Log</h3>
      <AttendanceLogTable data={attendanceData} />
    </section>
  );
};

export default AttendanceFormPage;
