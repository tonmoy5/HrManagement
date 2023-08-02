"use client";
import LeaveForm from "@components/LeaveForm";
// LeaveManagement.js

import Modal from "@components/Modal";
import Table from "@components/Table";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";

export const metadata = {
  title: "HRM | Leaves",
};

const LeaveManagement = () => {
  const headers = [
    "Employee Name",
    "Reason",
    "Start Date",
    "End Date",
    "Status",
  ];
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/leave");
        const json = await response.json();
        setLeaveData(json.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setSelectedLeave(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (leave) => {
    console.log("🚀 ~ file: page.jsx:45 ~ handleEdit ~ leave:", leave);
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleUpdateLeave = (updatedLeave) => {
    if (updatedLeave._id) {
      // If ID exists, update the existing leave entry
      setLeaveData((prevData) => {
        return prevData.map((leave) =>
          leave._id === updatedLeave._id ? updatedLeave : leave
        );
      });
    } else {
      // If ID doesn't exist, add the new leave entry
      setLeaveData((prevData) => [...prevData, updatedLeave]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (leave) => {
    // Perform delete operation, then update leaveData state
    // Implementation of delete operation is not provided here
    // You can make a DELETE API request to the backend to delete the leave entry
    console.log("Delete clicked for leave:", leave);
  };

  const handleUpdateStatus = (row) => {};

  const actionButtons = [
    {
      label: <GoPencil className="text-xl" />,
      onClick: handleEdit,
      title: "Edit",
    },
    {
      label: <HiOutlineTrash className="text-xl" />,
      onClick: handleDelete,
      title: "Delete",
    },
    {
      label: <BsCheck className="text-xl" />,
      onClick: handleUpdateStatus,
      title: "Approve",
    },
  ];

  return (
    <section className="p-5 bg-white rounded shadow">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${selectedLeave ? "Edit" : "Add"} Leave Request`}
      >
        <LeaveForm
          initialData={selectedLeave}
          onSubmit={handleUpdateLeave}
          handleCloseModal={handleCloseModal}
        />
      </Modal>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="font-bold text-lg blue_gradient w-max">
          Leave Management
        </h1>
        <button
          onClick={handleOpenModal}
          className="btn_green text-sm flex items-center gap-2"
        >
          <IoMdAdd className="font-bold" />
          Add Leave Request
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : leaveData.length > 0 ? (
        <Table
          headers={headers}
          data={leaveData.map((leave) => {
            return {
              _id: leave._id,
              employeeName: leave.employee.fullName,
              reason: leave.reason,
              startDate: new Date(leave.startDate).toLocaleDateString(),
              endDate: new Date(leave.endDate).toLocaleDateString(),
              status: (
                <span
                  className={
                    leave.status === "pending"
                      ? "orange_gradient"
                      : "green_gradient"
                  }
                >
                  {leave.status}
                </span>
              ),
            };
          })}
          actionButtons={actionButtons}
        />
      ) : (
        <p>No leave data available.</p>
      )}
    </section>
  );
};

export default LeaveManagement;
