"use client";
import Button from "@components/atoms/Button";
import LabeledInput from "@components/molecules/LabeledInput";
import { useState } from "react";

const GeneralInformationForm = ({ userInfo, loading, onSubmit }) => {
  const {
    image,
    fullName,
    email,
    phone,
    address,
    designation,
    department,
    role,
  } = userInfo;

  const [formData, setFormData] = useState({
    fullName: fullName,
    address: address,
    phone: phone,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 "
      onSubmit={handleSubmit}
    >
      <h6 className="text-xl mb-5">General Information</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
          <img
            src={
              image ||
              "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/22-512.png"
            } // Provide default image URL
            alt="Image"
            className="mx-auto h-20 w-20 rounded-full object-cover md:h-32 md:w-32"
          />
        </div>
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <LabeledInput
            label="Full Name"
            id="fullName"
            type="text"
            placeholder="Jimmy Turner"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((p) => ({ ...p, fullName: e.target.value }))
            }
            readOnly={role === "admin"}
          />
          <LabeledInput
            label="Email"
            id="email"
            type="email"
            placeholder="Jimmy@gmail.com"
            value={email}
            readOnly
          />

          <LabeledInput
            label="Phone"
            id="phone"
            type="text"
            placeholder="+1 (530) 555-12121"
            value={formData.phone}
            onChange={(e) =>
              setFormData((p) => ({ ...p, phone: e.target.value }))
            }
            readOnly={role === "admin"}
          />
          <LabeledInput
            label="Designation"
            id="designation"
            type="text"
            value={designation}
            readOnly
          />

          <LabeledInput
            label="Address"
            id="address"
            type="text"
            placeholder="New York"
            value={formData.address}
            onChange={(e) =>
              setFormData((p) => ({ ...p, address: e.target.value }))
            }
            readOnly={role === "admin"}
          />
          <LabeledInput
            label="Department"
            id="department"
            type="text"
            placeholder="Web Developer"
            value={department}
            readOnly
          />

          {userInfo.role === "admin" ? (
            <p className="text-red-500">*Admin data is not editable</p>
          ) : (
            <div className="mt-3 sm:col-span-2">
              <Button disabled={loading} type="submit">
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default GeneralInformationForm;
