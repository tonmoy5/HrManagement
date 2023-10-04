import axios from "axios";
import { useEffect, useState } from "react";

const EditTaskForm = ({ task, onUpdate, employees }) => {
  const [taskData, setTaskData] = useState({
    employee: task.employee._id,
    title: task.title,
    description: task.description,
    points: task.points,
    status: task.status,
    startDate: task.startDate.slice(0, 10),
    endDate: task.endDate.slice(0, 10),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTaskData({
      employee: task.employee._id,
      title: task.title,
      description: task.description,
      points: task.points,
      status: task.status,
      startDate: task.startDate.slice(0, 10),
      endDate: task.endDate.slice(0, 10),
    });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/tasks?id=${task._id}`, taskData);
      const updatedTask = response.data.data;
      onUpdate(updatedTask);
      setLoading(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
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
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          >
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
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
            className="border-gray-300 rounded-md p-2 w-full border"
            required
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
            className="border-gray-300 rounded-md p-2 w-full border"
            rows="4"
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
            className="border-gray-300 rounded-md p-2 w-full border"
            required
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
            className="border-gray-300 rounded-md p-2 w-full border"
          >
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="late">Late</option>
          </select>
        </div>
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
            className="border-gray-300 rounded-md p-2 w-full border"
            required
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
            className="border-gray-300 rounded-md p-2 w-full border"
            required
          />
        </div>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn_blue disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
