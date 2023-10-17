import { useEffect, useState } from "react";

const UserForm = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
      setRole(user.role || "admin");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = {
        _id: user ? user._id : null,
        fullName,
        email,
        username,
        role: role ? role : "admin",
        password,
      };

      const requestOptions = {
        method: user ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      };

      const response = await fetch("/api/users", requestOptions);

      if (!response.ok) {
        throw new Error("Failed to update/add user.");
      }

      const data = await response.json();

      onUpdateUser(data.data);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error("Error updating/adding user:", error);
      setError("Failed to update/add user.");
      setIsLoading(false);
    }
  };

  const handleOnClose = () => {
    setFullName("");
    setEmail("");
    setUsername("");
    setRole("");
    setPassword("");
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">
            {user ? "Edit User" : "Add User"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Full Name:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-indigo-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email:</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Username:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Password:</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Role:</label>
              <select
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-indigo-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                {/* <option value="employee">Employee</option> */}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn_blue text-white rounded px-4 py-2 mr-2"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleOnClose}
                className="bg-gray-300 text-gray-600 rounded px-4 py-2"
              >
                Cancel
              </button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </div>
      </div>
    )
  );
};

export default UserForm;
