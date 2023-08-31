// /utils/api/profile

export async function getProfileData(email) {
  const apiUrl = `/api/profile?email=${email}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch profile data");
  }

  return response.json();
}
