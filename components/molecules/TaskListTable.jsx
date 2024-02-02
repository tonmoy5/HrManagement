import dayjs from "dayjs";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineEye } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import Alert from "../Alert";
import Table from "../Table";

const TaskListTable = ({ tasks, onDelete, onEdit, onComplete }) => {
  const headers = ["Title", "Create", "Due", "Status", "Employee"];

  const [toast, setToast] = useState({ active: false, message: "" });

  const markTaskAsComplete = async (task) => {
    try {
      if (task.status !== "pending") {
        setToast({
          active: true,
          message: "Task is already completed",
          className: "bg-red-500",
        });
      }
      const taskId = task._id;
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

  const actionButtons = [
    {
      label: <AiOutlineEye className="text-xl" />,
      onClick: () => {},
      title: "View",
    },
    {
      label: <GoPencil className="text-xl" />,
      onClick: (row) => {},
      title: "Edit",
    },
    {
      label: <AiOutlineCheck className="text-xl" />,
      onClick: (task) => markTaskAsComplete(task),
      title: "Complete",
    },
  ];

  return (
    <div>
      <Table
        headers={headers}
        data={tasks?.map((d) => {
          return {
            _id: d._id,
            title: d.title,
            create: dayjs(d.createDate).format("DD/MM/YYYY"),
            due: dayjs(d.dueDate).format("DD/MM/YYYY"),
            status: d.status,
            employee: d.employee.fullName,
          };
        })}
        actionButtons={actionButtons}
      />
      {toast.active && (
        <Alert
          className={toast.className}
          handleClose={() => setToast({ active: false, message: "" })}
          isAlertOpen={toast.active}
          message={toast.message}
        />
      )}
    </div>
  );
};

export default TaskListTable;
