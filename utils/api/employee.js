export async function getEmployeesData() {
  const res = await fetch("/api/employee");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getEmployeeById(employeeId) {
  const res = await fetch(`/api/employee/${employeeId}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function addEmployee(formData) {
  const res = await fetch(`/api/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function updateEmployeeData({ employeeId, formData }) {
  const res = await fetch(`/api/employee/${employeeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function checkExistsEmployee({ email, username }) {
  const queryParams = new URLSearchParams({ email, username });
  const res = await fetch(
    `/api/employee/check-exist?${queryParams.toString()}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
