import axios from "axios";
import { useState } from "react";

const AddTaskForm = ({ onAdd, employees }) => {
  const [file, setFile] = useState(null); // [File, File, File]
  const [taskData, setTaskData] = useState({
    employee: "",
    title: "",
    description: "",
    points: "",
    status: "pending",
    startDate: "",
    endDate: "",
    attachment: "",
    submittedAttachment: "",
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
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const fileRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const fileData = await fileRes.json();
        taskData.attachment = fileData.url;
      }

      const response = await axios.post("/api/tasks", taskData);
      const newTask = response.data.data;
      onAdd(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task. Please try again.");
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
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

      {file ? (
        <div className="mb-2">
          <h3 className="font-bold mb-1">Attachment</h3>
          <ul>
            <li className="flex justify-between">
              <span>{file.name}</span>
              <span className="text-red-500" onClick={() => handleRemoveFile()}>
                X
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Attachments
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M20 8v20m0 0l-8-8m8 8l8-8m5-4H6a2 2 0 00-2 2v24a2 2 0 002 2h36a2 2 0 002-2V6a2 2 0 00-2-2z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring_blue"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        </div>
      )}

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
