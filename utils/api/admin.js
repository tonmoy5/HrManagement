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
