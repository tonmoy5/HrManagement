// /api/upload

import { unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import Employee from "../../../models/employee";
import User from "../../../models/user";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  const email = data.get("email");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(`public`, `uploads`, file.name);
  const filePath = join(file.name);
  await writeFile(path, buffer);

  let user =
    (await User.findOne({ email: email })) ||
    (await Employee.findOne({ email: email }));

  if (user) {
    user.image = `/uploads/${filePath}`;
    user.save();
  }

  return NextResponse.json({ success: true, url: `/uploads/${filePath}` });
}

export async function DELETE(request) {
  const { fileName } = await request.json();
  console.log("🚀 ~ file: route.js:41 ~ DELETE ~ fileName:", fileName);

  if (!fileName) {
    return NextResponse.json({ success: false }).status(500);
  }
  const path = join(`public`, fileName);
  await unlink(path);

  return NextResponse.json({
    success: true,
    message: `File removed successfully!`,
  });
}
