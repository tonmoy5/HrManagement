// /api/upload
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import Employee from "../../../models/employee";
import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const formData = await request.formData();
  formData.append("upload_preset", "hr-management");

  const email = formData.get("email");
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }
  // Upload the image to Cloudinary
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    const imageUrl = data.secure_url;

    await connectToDB();

    // let user =
    // (await User.findOne({ email: email })) ||
    // (await Employee.findOne({ email: email }));
    
    // console.log("🚀 ~ POST ~ user:", user)

    // if (user) {
    //   user.image = imageUrl;
    //   user.save();
    // }

    await User.updateOne({email}, {image:imageUrl}, {new:true})
    
    await Employee.updateOne({email}, {image:imageUrl}, {new:true})

    return NextResponse.json({ success: true, url: imageUrl, imageUrl });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to upload file",
    });
  }
}

export async function DELETE(request) {
  const { fileUrl } = await request.json();

  const urlParams = new URLSearchParams(new URL(fileUrl).search);
  // const fileId = urlParams.get("id");

  try {
    // const response = await fetch(
    //   `https://google-drive-upload.onrender.com/delete-file/${fileId}`,

    //   {
    //     method: "DELETE",
    //     body: JSON.stringify({ uploadKey: process.env.UPLOAD_KEY }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const splitUrl = fileUrl.split("/");
    let fileId =
      splitUrl[splitUrl.length - 2] + "/" + splitUrl[splitUrl.length - 1];
    fileId = fileId.split(".")[0];

    const response = await cloudinary.uploader.destroy(fileId);

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error:", error);
    return NextResponse.json({
      success: false,
      message: `File removed unsuccessful!`,
    }).status(500);
  }
}

// import { unlink, writeFile } from "fs/promises";
// import { NextResponse } from "next/server";
// import { join } from "path";
// import Employee from "../../../models/employee";
// import User from "../../../models/user";

// export async function POST(request) {
//   const data = await request.formData();
//   const file = data.get("file");

//   const email = data.get("email");

//   if (!file) {
//     return NextResponse.json({ success: false });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const path = join(`public`, `uploads`, file.name);
//   const filePath = join(file.name);
//   await writeFile(path, buffer);

//   await connectToDB();

//   let user =
//     (await User.findOne({ email: email })) ||
//     (await Employee.findOne({ email: email }));

//   if (user) {
//     user.image = `/uploads/${filePath}`;
//     user.save();
//   }

//   return NextResponse.json({ success: true, url: `/uploads/${filePath}` });
// }

// export async function DELETE(request) {
//   const { fileName } = await request.json();
//   console.log("🚀 ~ file: route.js:41 ~ DELETE ~ fileName:", fileName);

//   if (!fileName) {
//     return NextResponse.json({ success: false }).status(500);
//   }
//   const path = join(`public`, fileName);
//   await unlink(path);

//   return NextResponse.json({
//     success: true,
//     message: `File removed successfully!`,
//   });
// }

// import { google } from "googleapis";
// import { NextResponse } from "next/server";
// import Employee from "../../../models/employee";
// import User from "../../../models/user";

// import { Readable } from "node:stream";

// const serviceAccountKey = {
//   type: process.env.TYPE,
//   project_id: process.env.PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY,
//   client_email: process.env.CLIENT_EMAIL,
//   client_id: process.env.CLIENT_ID,
//   auth_uri: process.env.AUTH_URI,
//   token_uri: process.env.TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
//   universe_domain: process.env.UNIVERSE_DOMAIN,
// };

// // Initialize the Google Drive API client with your credentials
// const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
// const auth = new google.auth.GoogleAuth({
//   keyFile: serviceAccountKey,
//   scopes: SCOPES,
// });
// const drive = google.drive({ version: "v3", auth });

// export async function POST(request) {
//   const data = await request.formData();
//   const file = data.get("file");
//   const email = data.get("email");

//   const fileBuffer = file.stream();

//   if (!file) {
//     return NextResponse.json({ success: false });
//   }

//   // Define the file metadata
//   const fileMetadata = {
//     name: file.name,
//     fields: "id",
//   };

//   // Upload the file to Google Drive
//   try {
//     const response = await drive.files
//       .create({
//         media: {
//           mimeType: file.type,
//           body: Readable.from(fileBuffer),
//         },
//         requestBody: fileMetadata,
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => console.log(err));

//     // Get the file ID from the response
//     const fileId = response.data.id;

//     let user =
//       (await User.findOne({ email: email })) ||
//       (await Employee.findOne({ email: email }));

//     if (user) {
//       // Set the image URL to the Google Drive file URL
//       user.image = `https://drive.google.com/uc?id=${fileId}`;
//       user.save();
//     }

//     return NextResponse.json({
//       success: true,
//       url: `https://drive.google.com/uc?id=${fileId}`,
//     });
//   } catch (error) {
//     console.error("Error uploading file to Google Drive:", error.message);
//     return NextResponse.json({ success: false, error: error.message }).status(
//       500
//     );
//   }
// }

// export async function DELETE(request) {
//   const { fileId } = await request.json();

//   if (!fileId) {
//     return NextResponse.json({ success: false }).status(500);
//   }

//   // Delete the file from Google Drive
//   try {
//     await drive.files.delete({
//       fileId: fileId,
//     });

//     return NextResponse.json({
//       success: true,
//       message: `File removed successfully from Google Drive!`,
//     });
//   } catch (error) {
//     console.error("Error deleting file from Google Drive:", error.message);
//     return NextResponse.json({ success: false, error: error.message }).status(
//       500
//     );
//   }
// }
