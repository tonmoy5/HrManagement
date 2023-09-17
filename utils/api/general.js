export async function getDepartmentsData() {
  const res = await fetch("/api/department", { cache: "no-store" });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getDesignationsData() {
  const res = await fetch("/api/designation", { cache: "no-store" });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function uploadToGoogleDrive(selectedFile) {
  const accessToken = "YOUR_ACCESS_TOKEN"; // You need to obtain an access token
  const uploadEndpoint = "https://www.googleapis.com/upload/drive/v3/files";

  const formData = new FormData();
  formData.append("file", selectedFile);
  const response = await fetch(`${uploadEndpoint}?uploadType=media`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed.");
  }
  return response.json();
}

export const uploadFileToServer = async (files, email) => {
  const file = files[0];
  const data = new FormData();
  data.set("file", file);
  if (email) {
    data.set("email", email);
  }
  const res = await fetch("/api/upload", {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
