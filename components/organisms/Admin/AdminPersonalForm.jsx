"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LabeledInput from "../../../components/molecules/LabeledInput";
import { useUserContext } from "../../../context/UserContext";
import { checkExistsEmployee } from "../../../utils/api/employee";
import {
  deleteFileFromServer,
  uploadFileToServer,
} from "../../../utils/api/general";

const AdminPersonalForm = React.memo(({ formData, setFormData }) => {
  const [uploading, setUploading] = useState(false);
  const { data: session } = useSession();
  const [exist, setExist] = useState(null);

  const { user, updateUser } = useUserContext();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (session?.user.email !== formData.email) {
        const resData = await checkExistsEmployee({
          email: formData.email,
        });

        setExist(resData.data);
      } else {
        setExist(null);
      }
    }, 1000); // Adjust the debounce delay here (in milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [formData?.email]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (user.username !== formData.username) {
        const resData = await checkExistsEmployee({
          username: formData.username,
        });
        console.log(
          "🚀 ~ file: AdminPersonalForm.jsx:38 ~ delayDebounceFn ~ resData:",
          resData
        );
        setExist(resData.data);
      } else {
        setExist(null);
      }
    }, 1000); // Adjust the debounce delay here (in milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [formData?.username]);

  const handleUpload = async (e) => {
    setUploading(true);
    try {
      const resData = await uploadFileToServer(e.target.files, formData.email);
      await deleteFileFromServer(formData.image);
      setFormData((p) => ({ ...p, image: `${resData.url}` }));
      updateUser({ image: `${resData.url}` });
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  if (!formData) return <p>Form data not provided</p>;

  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 ">
      <h6 className="text-xl mb-5">Personal Information</h6>
      <div className="flex flex-wrap flex-col gap-5 sm:flex-row">
        <div className="mb-5 w-full md:w-[200px] sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
          <div className="w-32 h-32 relative mx-auto">
            <img
              src={
                formData?.image ||
                "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/22-512.png"
              } // Provide default image URL
              alt="Image"
              className={`mx-auto rounded-full object-cover md:h-32 md:w-32  ${
                uploading && " opacity-30 "
              }`}
            />
            {uploading && (
              <div className="border-4 border-gray-300 rounded-full animate-spin absolute inset-0 border-t-blue-500"></div>
            )}
          </div>

          <div className="mt-2 ">
            <label
              className="border rounded bg-gray-100 py-1 px-3 w-4/5 mx-auto text-center text-sm cursor-pointer block"
              htmlFor="avatar"
            >
              Change Image
            </label>
            <input
              id="avatar"
              type="file"
              onChange={handleUpload}
              className="hidden"
            />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <LabeledInput
            label="Full Name *"
            id="fullName"
            type="text"
            placeholder="Jimmy Turner"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((p) => ({ ...p, fullName: e.target.value }))
            }
          />
          <div className="relative">
            <LabeledInput
              label="Username *"
              id="username"
              type="text"
              placeholder="Jimmy"
              value={formData.username}
              onChange={(e) =>
                setFormData((p) => ({ ...p, username: e.target.value }))
              }
            />
            {exist?.username && (
              <p className="absolute top-0.5 left-24 text-red-500 text-xs">
                Username already exist
              </p>
            )}
          </div>
          <div className="relative">
            <LabeledInput
              label="Email *"
              id="email"
              type="email"
              placeholder="Jimmy@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
            />
            {exist?.email && (
              <p className="absolute top-0.5 left-14 text-red-500 text-xs">
                Email already exist
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminPersonalForm;
