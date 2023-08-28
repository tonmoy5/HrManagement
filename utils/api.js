export async function getEmployeesData() {
  const res = await fetch("/api/employee");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getAttendanceData(params) {
  const queryString = new URLSearchParams(params).toString();
  const apiUrl = `/api/attendance?${queryString}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch attendance data");
  }

  return response.json();
}
