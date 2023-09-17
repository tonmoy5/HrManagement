import React, { useState } from "react";
import { resetPassword } from "../../utils/api/admin";
import EmployeeSelect from "./EmployeeSelect";

const ResetPasswordForm = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!selectedEmployee || !newPassword) {
      return;
    }

    setLoading(true);
    try {
      // Call the resetPassword function with the selectedEmployee and newPassword
      await resetPassword(selectedEmployee.email, newPassword);
      setResetSuccess(true);
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle the error and show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Reset Password</h3>
      <EmployeeSelect onChange={setSelectedEmployee} />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword} disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
      {resetSuccess && <p>Password reset successfully!</p>}
    </div>
  );
};

export default ResetPasswordForm;
