import axios from "axios";
import { useEffect, useState } from "react";

const EditTaskForm = ({ task, onUpdate, employees }) => {
  console.log(
    "🚀 ~ file: EditTaskForm.jsx:5 ~ EditTaskForm ~ employees:",
    employees
  );
  const [taskData, setTaskData] = useState({
    employee: task.employee._id,
    title: task.title,
    description: task.description,
    points: task.points,
    status: task.status,
    startDate: task.startDate.slice(0, 10),
    endDate: task.endDate.slice(0, 10),
  });

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

    try {
      const response = await axios.put(`/api/tasks/${task._id}`, taskData);
      const updatedTask = response.data.data;
      onUpdate(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-2">Edit Task</h2>
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
        <div className="flex justify-end">
          <button type="submit" className="btn_blue">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
