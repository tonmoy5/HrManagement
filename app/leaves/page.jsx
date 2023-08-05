"use client";
import Alert from "@components/Alert";
import LeaveForm from "@components/LeaveForm";
// LeaveManagement.js

import Modal from "@components/Modal";
import Table from "@components/Table";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
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

  const [toast, setToast] = useState({
    active: false,
    message: "",
    className: "",
  });

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
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleUpdateLeave = (updatedLeave, flag) => {
    console.log("updateLeave", updatedLeave);
    if (flag === "old") {
      console.log(
        "🚀 ~ file: page.jsx:64 ~ handleUpdateLeave ~ updatedLeave._id:",
        updatedLeave._id
      );
      // If ID exists, update the existing leave entry
      setLeaveData((prevData) => {
        return prevData.map((leave) =>
          leave._id === updatedLeave._id ? updatedLeave : leave
        );
      });
    } else {
      // If ID doesn't exist, add the new leave entry
      console.log("New leave entry");
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

  const handleUpdateStatus = async (row) => {
    if (row?.status?.props?.children === "approved") {
      return setToast({
        active: true,
        message: "Leave already approved!",
        className: "bg_green_gradient text-white",
      });
    }
    const response = await fetch("/api/leave", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: row._id, status: "approved" }),
    });
    const data = await response.json();
    if (data.success) {
      setToast({
        active: true,
        message: "Leave successfully approved!",
        className: "bg_green_gradient text-white",
      });
    }
  };

  const actionButtons = [
    {
      label: <GoPencil className="text-xl" />,
      onClick: handleEdit,
      title: "Edit",
    },
    // {
    //   label: <HiOutlineTrash className="text-xl" />,
    //   onClick: handleDelete,
    //   title: "Delete",
    // },
    {
      label: <BsCheck className="text-xl" />,
      onClick: handleUpdateStatus,
      title: "Approve",
    },
  ];

  return (
    <section className="p-5 bg-white rounded shadow">
      <Alert
        className={toast.className}
        handleClose={() => setToast((p) => ({ ...p, active: false }))}
        isAlertOpen={toast.active}
        message={toast.message}
      />
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
