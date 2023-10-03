"use client";
// LeaveForm.js

import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

const LeaveForm = ({ initialData, onSubmit, handleCloseModal }) => {
  const { user } = useUserContext();

  const [employeeId, setEmployeeId] = useState(
    user.role === "employee" ? user._id : ""
  );
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [halfDay, setHalfDay] = useState(false); // State for half-day selection
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Fetch employee data when the component mounts
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch("/api/employee", { cache: "no-store" });
      const json = await response.json();
      setEmployeeData(json.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    if (initialData) {
      if (employeeData.length > 0) {
        setEmployeeId(
          employeeData.find((e) => e.fullName === initialData.employeeName)?._id
        );
      }
      setReason(initialData.reason);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
    }
  }, [initialData, employeeData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const leaveData = {
      _id: initialData?._id || undefined,
      employeeId,
      startDate,
      endDate,
      reason: reason,
      halfDay,
    };

    try {
      setIsLoading(true);
      setError(null);

      const requestOptions = {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      };

      const response = await fetch("/api/leave", requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit leave request.");
      }

      setIsLoading(false);
      if (initialData) {
        onSubmit(data.data, "old");
      } else {
        onSubmit(data.data, "new");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Failed to submit leave request.");
      console.error("Error submitting leave request:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label htmlFor="employeeId" className="text-gray-700 font-medium">
          Employee:
        </label>
        <select
          id="employeeId"
          value={user.role === "employee" ? user._id : employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
          disabled={user.role === "employee"}
          className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
        >
          <option value="">Select an employee</option>
          {employeeData.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.fullName} ({employee.designation?.title})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="startDate" className="text-gray-700 font-medium">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={
            startDate ? new Date(startDate).toISOString().split("T")[0] : ""
          }
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="text-gray-700 font-medium">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate ? new Date(endDate).toISOString().split("T")[0] : ""}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="halfDay"
          checked={halfDay}
          onChange={(e) => setHalfDay(e.target.checked)}
          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        />
        <label htmlFor="halfDay" className="text-gray-700">
          Half Day
        </label>
      </div>
      <div>
        <label htmlFor="reason" className="text-gray-700 font-medium">
          Leave Reason:
        </label>
        <input
          type="text"
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
        />
      </div>
      <div className="flex justify-end gap-3 mb-2">
        <button
          type="button"
          disabled={isLoading}
          className={`outline_btn_red text-sm ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`btn_blue text-sm ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default LeaveForm;
