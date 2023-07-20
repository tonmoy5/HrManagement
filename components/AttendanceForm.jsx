"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "./Alert";

const AttendanceForm = ({ employees }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    active: false,
    message: "",
    className: "",
  });
  const [formData, setFormData] = useState({
    employeeId: "",
    punchType: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const punchType = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      punchType: punchType,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { employeeId, punchType, date, time } = formData;
      const data = { employeeId, date };

      if (punchType === "punchIn") {
        data.checkInTime = new Date(`${date}T${time}:00Z`);
      } else if (punchType === "punchOut") {
        data.checkOutTime = new Date(`${date}T${time}:00Z`);
      }

      const response = await fetch(
        `/api/attendance/${punchType === "punchIn" ? "check-in" : "check-out"}`,
        {
          method: punchType === "punchIn" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setToast({
        active: true,
        message: `${
          punchType === "punchIn" ? "Punch In " : "Punch Out"
        } Success`,
        className: "bg-green-100 text-green-500",
      });

      // Reset the form fields
      setFormData({
        employeeId: "",
        punchType: "",
        date: "",
        time: "",
      });
      router.refresh();
    } catch (error) {
      console.error(
        `Error performing attendance ${
          formData.punchType === "punchIn" ? "check in" : "check out"
        }:`,
        error
      );
      setToast({
        active: true,
        message: error.message,
        className: "bg-red-100 text-red-500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Alert
        className={toast.className}
        handleClose={() => setToast({ active: false, message: "" })}
        isAlertOpen={toast.active}
        message={toast.message}
      />
      <form onSubmit={handleSubmit} className="space-y-4 md:w-1/2 w-full">
        <div>
          <label htmlFor="employee" className="text-gray-700 font-medium">
            Employee:
          </label>
          <select
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee?._id}>
                {employee?.fullName} ({employee?.designation?.title})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-gray-700 font-medium">Punch Type:</label>
          <div className="flex space-x-4">
            <div>
              <input
                type="radio"
                id="punchIn"
                name="punchType"
                value="punchIn"
                checked={formData.punchType === "punchIn"}
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="punchIn" className="ml-2">
                Punch In
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="punchOut"
                name="punchType"
                value="punchOut"
                checked={formData.punchType === "punchOut"}
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="punchOut" className="ml-2">
                Punch Out
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="date" className="text-gray-700 font-medium">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
          />
        </div>
        <div>
          <label htmlFor="time" className="text-gray-700 font-medium">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn_blue text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
