"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import Modal from "../Modal";
import AddTaskForm from "../molecules/AddTaskForm";
import EditTaskForm from "../molecules/EditTaskForm";
import TaskList from "../molecules/TaskList";

const TasksPageTemplate = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const { user } = useUserContext();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employee", { cache: "no-store" });
      const employeeData = response.data.data;
      setEmployees(employeeData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch employees data when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch tasks from the API
  useEffect(() => {
    if (user) {
      const url =
        user.role === "admin"
          ? `/api/tasks`
          : `/api/tasks?employeeId=${user._id}`;
      axios.get(url).then((response) => {
        setTasks(response.data.data);
        setIsLoading(false);
      });
    }
  }, [user]);

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
        await axios.delete(`/api/tasks?id=${taskToDelete._id}`);
        const updatedTasks = tasks.filter(
          (task) => task._id !== taskToDelete._id
        );
        setTasks(updatedTasks);
        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const saveTask = async (taskData) => {
    try {
      if (selectedTask) {
        const updatedTasks = tasks.map((task) =>
          task._id === taskData._id ? taskData : task
        );
        closeEditModal();
        setTasks(updatedTasks);
      } else {
        closeAddModal();
        setTasks([...tasks, taskData]);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const markTaskAsComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: "completed" } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold mb-2 text-xl ml-2 blue_gradient w-max">
          Task Manager
        </h2>
        {user.role === "admin" ? (
          <button onClick={openAddModal} className="btn_green">
            Add Task
          </button>
        ) : null}
      </div>

      {isLoading ? (
        <div className="ml-2">Loading</div>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={openDeleteModal}
          onEdit={openEditModal}
          onComplete={markTaskAsComplete}
        />
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add New Task"
      >
        <AddTaskForm onAdd={saveTask} employees={employees} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Task"
      >
        {selectedTask && (
          <EditTaskForm
            task={selectedTask}
            onUpdate={saveTask}
            employees={employees}
          />
        )}
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default TasksPageTemplate;

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
      <p>Are you sure you want to delete this task?</p>
      <div className="flex justify-end mt-4">
        <button onClick={onDelete} className="btn_red">
          Delete
        </button>
        <button onClick={onClose} className="btn_gray ml-2">
          Cancel
        </button>
      </div>
    </Modal>
  );
};
