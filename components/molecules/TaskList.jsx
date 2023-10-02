import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useUserContext } from "../../context/UserContext";

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  const { user } = useUserContext();

  const markTaskAsComplete = async (taskId) => {
    try {
      const response = await axios.put(`/api/tasks?id=${taskId}`, {
        status: "completed",
      });
      const updatedTask = response.data.data;
      onComplete(taskId);
    } catch (error) {
      console.error("Error marking task as complete:", error);
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
    <div className="grid grid-cols-2 gap-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`rounded-lg shadow-md p-4 hover:shadow-lg ${getStatusColorClass(
            task.status
          )}`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <div className="space-x-2">
              {user.role === "admin" ? (
                <>
                  <button
                    onClick={() => onEdit(task)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </>
              ) : null}
              {task.status === "pending" && (
                <button
                  onClick={() => markTaskAsComplete(task._id)}
                  className="text-green-500"
                >
                  <FaCheckCircle />
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-gray-500 mt-2">
            <span className="font-semibold">Employee:</span>{" "}
            {task.employee.fullName}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold">Status:</span> {task.status}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold">Points:</span> {task.points}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(task.startDate).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(task.endDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
