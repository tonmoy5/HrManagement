"use client";
import { useEffect, useState } from "react";
import AttendanceLogTable from "../../components/AttendanceLogTable";
import TableLoader from "../../components/TableLoader";
import EmployeeSelect from "../../components/molecules/EmployeeSelect";
import LabeledInput from "../../components/molecules/LabeledInput";
import { getAttendanceData } from "../../utils/api/attendance";

const AttendanceLog = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({ value: "" });
  const [startDate, setStartDate] = useState(
    sevenDaysAgo.toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(today.toISOString().slice(0, 10));
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = {
        startDate,
        endDate,
        employeeId: selectedEmployee?.value || "",
      };
      const data = await getAttendanceData(params);
      setAttendanceData(data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, selectedEmployee]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="p-5 bg-white rounded shadow md:w-full ">
      <h1 className="font-bold text-lg mb-3 blue_gradient w-max">
        Attendance Log
      </h1>
      <div className="flex justify-between items-center md:flex-nowrap flex-wrap">
        <div className="flex space-x-4 mb-5 md:w-full ">
          <LabeledInput
            label="Start Date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <LabeledInput
            label="End Date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div className="md:w-1/2 w-full md:mb-0 mb-5">
          <EmployeeSelect onChange={setSelectedEmployee} />
        </div>
      </div>
      {isLoading && <TableLoader headers={["", "", "", ""]} rows={4} />}
      {!isLoading && <AttendanceLogTable data={attendanceData} />}
    </div>
  );
};

export default AttendanceLog;
