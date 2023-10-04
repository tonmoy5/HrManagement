import axios from "axios";
import { useState } from "react";

const AddTaskForm = ({ onAdd, employees }) => {
  const [taskData, setTaskData] = useState({
    employee: "",
    title: "",
    description: "",
    points: "",
    status: "pending",
    startDate: "",
    endDate: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/tasks", taskData);
      const newTask = response.data.data;
      onAdd(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        {/* Employee */}
        <div className="mb-4">
          <label
            htmlFor="employee"
            className="block text-sm font-medium text-gray-700"
          >
            Employee
          </label>
          <select
            id="employee"
            name="employee"
            value={taskData.employee}
            onChange={handleChange}
            className={`border border-gray-300 outline-none rounded-md p-2 w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            required
            disabled={isLoading}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className={`border border-gray-300 outline-none rounded-md p-2 w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            required
            disabled={isLoading}
          />
        </div>
        {/* Description */}
        <div className="mb-4 col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className={`border border-gray-300 outline-none rounded-md p-2 w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            rows="4"
            disabled={isLoading}
          ></textarea>
        </div>
        {/* Points */}
        <div className="mb-4">
          <label
            htmlFor="points"
            className="block text-sm font-medium text-gray-700"
          >
            Points
          </label>
          <input
            type="number"
            id="points"
            name="points"
            value={taskData.points}
            onChange={handleChange}
            className={`border border-gray-300 outline-none rounded-md p-2 w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            required
            disabled={isLoading}
          />
        </div>
        {/* Status */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className={`border border-gray-300 outline-none rounded-md p-2 w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={isLoading}
          >
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="late">Late</option>
          </select>
        </div>
        {/* Start Date */}
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            className={`border border-gray-300 outline-none rounded-md p-2 w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            required
            disabled={isLoading}
          />
        </div>
        {/* End Date */}
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={taskData.endDate}
            onChange={handleChange}
            className={`border border-gray-300 outline-none rounded-md p-2 w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            required
            disabled={isLoading}
          />
        </div>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className={`btn_blue ${
            isLoading ? "cursor-wait" : ""
          }  disabled:opacity-50`}
          disabled={isLoading}
        >
          {isLoading ? "Adding Task..." : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
