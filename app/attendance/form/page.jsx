"use client";
import { useEffect, useState } from "react";

const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    punchType: "",
    date: "",
    time: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/employee");
        const employeeData = await response.json();
        setEmployees(employeeData.data);
      } catch (error) {
        console.error("Error loading data:", error);
        // Display an error message or perform error handling
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.punchType === "punchIn") {
        const response = await fetch("/api/attendance/check-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: formData.employeeId,
            date: formData.date,
            checkInTime: formData.time,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to check in.");
        }

        const data = await response.json();
      } else if (formData.punchType === "punchOut") {
        const response = await fetch("/api/attendance/check-out", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: formData.employeeId,
            date: formData.date,
            checkOutTime: formData.time,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to check out.");
        }

        const data = await response.json();
      }
    } catch (error) {
      console.error("Error performing attendance action:", error);
    }

    // Reset the form fields
    setFormData({
      employeeId: "",
      punchType: "",
      date: "",
      time: "",
    });
  };

  return (
    <section className="p-5 bg-white rounded shadow">
      <h1 className="font-bold text-lg mb-3 blue_gradient w-max">
        Attendance Form
      </h1>
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
              <option key={employee._id} value={employee._id}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="punchType" className="text-gray-700 font-medium">
            Punch Type:
          </label>
          <select
            id="punchType"
            name="punchType"
            value={formData.punchType}
            onChange={handleChange}
            required
            className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
          >
            <option value="">Select Punch Type</option>
            <option value="punchIn">Punch In</option>
            <option value="punchOut">Punch Out</option>
          </select>
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
          <button type="submit" className="btn_blue text-sm">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AttendanceForm;
