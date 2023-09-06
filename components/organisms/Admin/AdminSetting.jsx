"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CiLock, CiUser } from "react-icons/ci";
import Alert from "../../../components/Alert";
import AddButton from "../../../components/atoms/AddButton";
import TabButton from "../../../components/atoms/TabButton";
import { useUserContext } from "../../../context/UserContext";
import { updateUserInfo } from "../../../utils/api/admin";
import AdminPersonalField from "./AdminPersonalForm";

const INITIAL_DATA = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  image: "",
};

const AdminSetting = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useUserContext();
  const [formData, setFormData] = useState(user || {});
  const { data: session, update, status } = useSession();

  const [toast, setToast] = useState({
    active: false,
    message: "",
    className: "",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateUserInfo(formData);
      if (session.user.email !== formData.email) {
        await update({ email: formData.email, name: formData.fullName });
      }
      await updateUser(formData);
      setToast({
        active: true,
        message: `Info Updated successfully`,
        className: "bg_green_gradient text-white",
      });
      console.log("Form data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Display an error message or perform error handling
      setToast({
        active: true,
        message: "Something went wrong!",
        className: "bg-red-100 text-red-500",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <AdminPersonalField formData={formData} setFormData={setFormData} />
        );

      case "credentials":
        return <></>;

      default:
        return null;
    }
  };

  const listItems = [
    {
      id: 1,
      label: "Personal Info",
      value: "personal",
      icon: CiUser,
      role: ["admin"],
    },

    {
      id: 2,
      label: "Account Credentials",
      value: "credentials",
      icon: CiLock,
      role: ["admin", "employee"],
    },
  ];

  return (
    <div>
      {
        <AnimatePresence>
          {toast.active && (
            <Alert
              className={toast.className}
              handleClose={() => setToast({ active: false, message: "" })}
              isAlertOpen={toast.active}
              message={toast.message}
            />
          )}
        </AnimatePresence>
      }
      <h2 className="font-bold mb-3 text-xl ml-2 blue_gradient w-max">
        Admin Setting
      </h2>
      <ul className="mb-5 overflow-y-auto flex flex-wrap border-[#ebedf2] sm:flex px-3 text-sm">
        {listItems.map((list) => (
          <li key={list.id} className="inline-block">
            <TabButton
              isActive={activeTab === list.value}
              onClick={() => handleTabClick(list.value)}
            >
              <list.icon className="text-xl" />
              {list.label}
            </TabButton>
          </li>
        ))}
      </ul>
      {renderTabContent()}
      <div className="flex justify-end disabled:bg-opacity-50 disabled:cursor-not-allowed">
        <AddButton
          onClick={handleSubmit}
          label={loading ? "Loading..." : "Update"}
          disabled={loading}
        ></AddButton>
      </div>
    </div>
  );
};

export default React.memo(AdminSetting);
