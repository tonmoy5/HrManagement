"use client";
import { useEffect, useState } from "react";
import AttendanceForm from "../../../components/AttendanceForm";
import AttendanceLogTable from "../../../components/AttendanceLogTable";
import { useUserContext } from "../../../context/UserContext";
import { getAttendanceData } from "../../../utils/api/attendance";
import { getEmployeesData } from "../../../utils/api/employee";

const AttendanceFormPage = () => {
  const [employeesData, setEmployeesData] = useState({ data: [] });
  const [attendanceData, setAttendanceData] = useState([]);

  const { user } = useUserContext();

  useEffect(() => {
    const attendanceParams = {
      limit: 10,
    };

    if (!user) return;
    if (user?.role === "employee") {
      setEmployeesData({ data: [user] });
      attendanceParams.employeeId = user._id;
    } else {
      getEmployeesData()
        .then((data) => setEmployeesData(data))
        .catch((error) => {
          console.error("Error fetching employees data:", error);
          // Handle the error as needed
        });
    }

    getAttendanceData(attendanceParams)
      .then((data) => setAttendanceData(data.data))
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [user]);

  return (
    <section className="md:p-5 p-3 bg-white rounded shadow">
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
