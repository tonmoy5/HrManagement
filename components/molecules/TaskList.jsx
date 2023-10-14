import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useUserContext } from "../../context/UserContext";

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  const { user } = useUserContext();
  const [isUpdating, setIsUpdating] = useState(null);

  const markTaskAsComplete = async (taskId) => {
    console.log(
      "🚀 ~ file: TaskList.jsx:11 ~ markTaskAsComplete ~ taskId:",
      taskId
    );
    try {
      setIsUpdating(taskId);
      const response = await axios.put(`/api/tasks?id=${taskId}`, {
        status: "completed",
      });
      const updatedTask = response.data.data;
      onComplete(taskId);
    } catch (error) {
      console.error("Error marking task as complete:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100";
      case "late":
        return "bg-red-100";
      case "pending":
        return "bg-yellow-100";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`rounded-lg shadow-md p-4 hover:shadow-lg ${getStatusColorClass(
            task.status
          )} relative overflow-hidden`}
        >
          {isUpdating === task._id ? (
            <div className="absolute top-0 left-0 w-full">
              <div class="loader-line"></div>
            </div>
          ) : null}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <div className="space-x-2">
              {user.role === "admin" ? (
                <>
                  <button
                    onClick={() => onEdit(task)}
                    className="text-green-700 hover:text-green-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-700 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </>
              ) : null}
              {task.status === "pending" && (
                <button
                  onClick={() => markTaskAsComplete(task._id)}
                  className="text-green-700"
                >
                  <FaCheckCircle />
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600 mb-2">{task.description}</p>
          {user.role === "admin" ? (
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Employee:</span>{" "}
              {task.employee.fullName}
            </p>
          ) : null}

          <div className="grid grid-cols-2 ">
            <p className="text-gray-700 text-xs capitalize">
              <span className="font-semibold ">Status:</span> {task.status}
            </p>
            <p className="text-gray-700 text-xs">
              <span className="font-semibold ">Points:</span> {task.points}
            </p>
            <p className="text-gray-700 text-xs">
              <span className="font-semibold ">Start From:</span>{" "}
              {dayjs(task.startDate).format("ddd DD MMM, YYYY")}
            </p>
            <p className="text-gray-700 text-xs">
              <span className="font-semibold ">Due Date:</span>{" "}
              {dayjs(task.endDate).format("ddd DD MMM, YYYY")}
            </p>
          </div>
        </div>
      ))}
      {tasks.length === 0 ? <div className="pl-3">No tasks found</div> : null}
    </div>
  );
};

export default TaskList;
