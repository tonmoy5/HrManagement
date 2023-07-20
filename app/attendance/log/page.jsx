"use client";
import AttendanceLogTable from "@components/AttendanceLogTable";
import TableLoader from "@components/TableLoader";
import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

const AttendanceLog = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([
    {
      value: "",
      label: (
        <div className="flex flex-col items-start text-xs gap-1">
          <span className="font-bold">All</span>
          <span>Filter by employee</span>
        </div>
      ),
    },
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const [startDate, setStartDate] = useState(
    sevenDaysAgo.toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(today.toISOString().slice(0, 10));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, selectedEmployee]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/attendance?startDate=${startDate}&endDate=${endDate}&employeeId=${selectedEmployee.value}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch attendance data.");
      }
      const data = await response.json();
      setAttendanceData(data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const employeeResponse = await fetch("/api/employee");
      const employeeData = await employeeResponse.json();
      setEmployees([
        { _id: "", fullName: "All", email: "Filter by employee" },
        ...employeeData.data,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div>
            <label htmlFor="" className="text-sm block">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs py-2 px-2 border"
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm block">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs py-2 px-2 border"
            />
          </div>
          {/* <button onClick={fetchData} className="btn_blue text-sm">
          Filter
        </button> */}
        </div>
        <div className="md:w-1/2 w-full md:mb-0 mb-5">
          <CustomSelect
            options={employees.map((employee) => {
              return {
                value: employee._id || "",
                label: (
                  <div className="flex flex-col items-start text-xs gap-1">
                    <span className="font-bold">{employee.fullName}</span>
                    <span>{employee.email}</span>
                  </div>
                ),
              };
            })}
            selected={selectedEmployee}
            onChange={setSelectedEmployee}
          />
        </div>
      </div>
      {isLoading && <TableLoader headers={["", "", "", ""]} rows={4} />}
      {!isLoading && <AttendanceLogTable data={attendanceData} />}
    </div>
  );
};

export default AttendanceLog;

import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

const CustomSelect = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={handleToggle}
        className=" w-full border-gray-400 rounded shadow-sm py-2 px-2 border text-left flex justify-between items-center"
      >
        {selected?.label} <MdArrowForwardIos />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full mt-1 bg-white rounded shadow-lg max-h-[400px] overflow-x-auto z-20"
          >
            {options.map((option, index) => (
              <motion.div
                key={option.value || index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="cursor-pointer px-4 py-2 hover:bg-indigo-100"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
