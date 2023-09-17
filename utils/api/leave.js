// utils/api/leave.js

export async function getLeaveData(params) {
  const queryString = new URLSearchParams(params).toString();
  const apiUrl = `/api/leave?${queryString}`;

  const response = await fetch(apiUrl, { cache: "no-store" });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch leave data");
  }

  return response.json();
}
