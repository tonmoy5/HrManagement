export const updateUserInfo = async (formData) => {
  const res = await fetch(`/api/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to update data");
  }
  return res.json();
};

export async function resetPassword(employeeId, newPassword) {
  const res = await fetch("/api/employee/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ employeeId, newPassword }),
  });

  if (!res.ok) {
    // Handle error, throw an exception, or return an appropriate response
    throw new Error("Failed to reset password");
  }

  return res.json();
}
