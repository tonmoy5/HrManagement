"use client";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import TableLoader from "../../components/TableLoader";
import AddButton from "../../components/atoms/AddButton";
import UserDeleteModal from "../../components/organisms/UserDeleteModal";
import UserForm from "../../components/organisms/UserForm";
import { useUserContext } from "../../context/UserContext";

const Users = () => {
  const headers = ["Full Name", "Email", "Username", "Role"];
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ active: false, message: "" });

  const { user } = useUserContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    if (user.email === "admin@gmail.com") return;
    setSelectedUser(user);
    handleOpenModal();
  };

  const handleUpdateUser = (updatedUser) => {
    const index = users.findIndex((item) => item._id === updatedUser._id);
    if (index !== -1) {
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        newUsers[index] = updatedUser;
        return newUsers;
      });
    } else {
      setUsers((prevUsers) => [...prevUsers, updatedUser]);
    }
    handleCloseModal();
    setToast({
      active: true,
      message: index !== -1 ? "Update success" : "Add success",
      className: "bg-green-600 text-white",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users", { cache: "no-store" });
        const json = await response.json();
        setUsers(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const onDeleteSuccess = (user) => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
    setToast({
      active: true,
      message: "Delete Success!",
      className: "bg-red-600 text-white",
    });
  };

  const handleDelete = (user) => {
    if (user.email === "admin@gmail.com") return;
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const actionButtons = [
    {
      label: "Edit",
      onClick: handleEdit,
      title: "Edit",
    },
    {
      label: <span className="text-red-500">Delete</span>,
      onClick: handleDelete,
      title: "Delete",
    },
  ];

  return (
    <section className="p-5 bg-white rounded shadow">
      <UserForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />

      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDeleteSuccess={onDeleteSuccess}
        user={selectedUser}
      />

      {toast.active && (
        <Alert
          className={toast.className}
          onClose={() => setToast({ active: false, message: "" })}
          isOpen={toast.active}
          message={toast.message}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="font-bold text-lg blue_gradient w-max">Users</h1>
        <AddButton onClick={handleOpenModal} label="Add User" />
      </div>

      {loading ? (
        <TableLoader headers={headers} rows={4} actionButtons={actionButtons} />
      ) : (
        <Table
          headers={headers}
          data={users.map((u) => ({
            _id: u._id,
            fullName: u.fullName,
            email: u.email,
            username: u.username,
            role: u.role,
          }))}
          actionButtons={actionButtons}
        />
      )}
    </section>
  );
};

export default Users;
