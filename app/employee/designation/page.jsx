"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import Alert from "../../../components/Alert";
import Modal from "../../../components/Modal";
import Table from "../../../components/Table";
import TableLoader from "../../../components/TableLoader";
import AddButton from "../../../components/atoms/AddButton";

const Designation = () => {
  const headers = ["Title", "Details"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [toast, setToast] = useState({ active: false, message: "" });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    handleOpenModal();
  };

  const handleUpdateData = (updatedData) => {
    const index = data.findIndex((item) => item._id === updatedData.data._id);
    if (index !== -1) {
      // If ID matches, update the existing entry
      setData((prevData) => {
        const newData = [...prevData];
        newData[index] = updatedData.data;
        return newData;
      });
    } else {
      // If ID doesn't match, add the data as a new entry
      setData((prevData) => [...prevData, updatedData.data]);
    }
    handleCloseModal();
    setToast({
      active: true,
      message: index !== -1 ? "Update success" : "Add success",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/designation");
        const json = await response.json();
        setData(json.data);
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
    setSelectedRow(null);
  };
  const onDeleteSuccess = (row) => {
    setIsDeleteModalOpen(false);
    setSelectedRow(null);
    setData((prev) => prev.filter((r) => r._id !== row._id));
    setToast({ active: true, message: "Delete Success!" });
  };

  const handleDelete = (row) => {
    console.log("Delete clicked for row:", row);
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

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
  ];

  return (
    <section className="p-5 bg-white rounded shadow">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${selectedRow ? "Edit" : "Add"} Designation`}
      >
        <DesignationForm
          initialData={selectedRow}
          onSubmit={handleUpdateData}
          handleCloseModal={handleCloseModal}
        />
      </Modal>

      <DeleteModal
        handleCloseModal={handleDeleteModalClose}
        isModalOpen={isDeleteModalOpen}
        onSuccess={onDeleteSuccess}
        row={selectedRow}
      />
      <AnimatePresence>
        {toast.active && (
          <Alert
            className={toast.className}
            handleClose={() => setToast({ active: false, message: "" })}
            isAlertOpen={toast.active}
            message={toast.message}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="font-bold text-lg blue_gradient w-max">Designations</h1>
        <AddButton onClick={handleOpenModal} label={"Add Designation"} />
      </div>

      {loading ? (
        <TableLoader headers={headers} rows={4} actionButtons={actionButtons} />
      ) : (
        <Table
          headers={headers}
          data={data?.map((d) => {
            return { _id: d._id, title: d.title, details: d.details };
          })}
          actionButtons={actionButtons}
        />
      )}
    </section>
  );
};

export default Designation;

const DeleteModal = ({ row, isModalOpen, handleCloseModal, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/designation?id=${row._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete designation.");
      }

      // Perform any necessary cleanup or success handling
      onSuccess(row);
    } catch (error) {
      console.error("Error deleting designation:", error);
      setError("Failed to delete designation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={`Delete Designation`}
    >
      <div>
        <p>
          Are you sure you want to delete "
          <span className="font-bold">{row?.title}</span>" designation?
        </p>
      </div>
      <div className="flex justify-end gap-3 mb-2 mt-4">
        <button
          type="button"
          className="outline_btn_red text-sm"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn_red text-sm"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Delete"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </Modal>
  );
};

const DesignationForm = ({ initialData, onSubmit, handleCloseModal }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDetails(initialData.details);
    }
  }, [initialData]);

  const submitDesignation = async (designationData) => {
    setIsLoading(true);
    setError(null);

    try {
      const requestOptions = {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...designationData,
          id: initialData ? initialData._id : null,
        }),
      };

      const response = await fetch("/api/designation", requestOptions);

      if (!response.ok) {
        throw new Error("Failed to submit designation.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting designation:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const designationData = {
      title,
      details,
    };

    try {
      const response = await submitDesignation(designationData);

      if (response) {
        // Do something with the response data
        onSubmit(response);
      }
    } catch (error) {
      // Error in submission
      setError("Failed to submit designation.");
      console.error("Failed to submit designation:", error);
      // Display error message to the user or perform error handling
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="text-gray-700 font-medium">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border "
        />
      </div>
      <div>
        <label htmlFor="details" className="text-gray-700 font-medium">
          Details:
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
          className="block w-full border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
        />
      </div>
      <div className="flex justify-end gap-3 mb-2">
        <button
          type="button"
          disabled={isLoading}
          className={`outline_btn_red text-sm ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`btn_blue text-sm ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
