import { useState } from "react";

const DeleteModal = ({ isOpen, onClose, onDeleteSuccess, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);

    // Send a DELETE request to the server to delete the user
    try {
      const response = await fetch(`/api/users?id=${user._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the request is successful, call onDeleteSuccess
        onDeleteSuccess(user);
      } else {
        console.error("Error deleting user.");
      }
    } catch (error) {
      setError("Error deleting user.");
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Delete User</h2>
          <p className="mb-4">
            Are you sure you want to delete the user "{user?.fullName}"?
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white rounded px-4 py-2 mr-2"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-600 rounded px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
