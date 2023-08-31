"use client";
import Alert from "@components/Alert";
import TabButton from "@components/atoms/TabButton";
import GeneralInformationForm from "@components/organisms/GeneralInformationForm";
import BankInformationForm from "@components/template/BankInformationForm";
import CredentialInformationForm from "@components/template/CredentialInformationForm";
import useProfileInfo from "@hooks/useProfileInfo";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CiBank, CiHome, CiLock } from "react-icons/ci";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { userInfo, setUserInfo, isLoading } = useProfileInfo();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    active: false,
    message: "",
    className: "",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await updateEmployeeData({ employeeId, formData });
      setToast({
        active: true,
        message: "Successfully updated!",
        className: "bg-green-100 text-green-500",
      });
      setUserInfo((p) => ({ ...p, ...formData }));
      // Display a success message or perform any other necessary actions
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

  const handleChangePassword = (password) => {};

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <GeneralInformationForm
            userInfo={userInfo}
            onSubmit={onSubmit}
            loading={loading}
          />
        );
      case "bank-info":
        return (
          <BankInformationForm
            userInfo={userInfo}
            onSubmit={onSubmit}
            loading={loading}
          />
        );
      case "credentials":
        return (
          <CredentialInformationForm
            userInfo={userInfo}
            handleChangePassword={handleChangePassword}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  const listItems = [
    { id: 1, label: "Home", value: "home", icon: CiHome },
    { id: 2, label: "Bank Info", value: "bank-info", icon: CiBank },
    { id: 3, label: "Credentials", value: "credentials", icon: CiLock },
  ];

  return (
    <div>
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
      <ul className="mb-5 overflow-y-auto whitespace-nowrap border-[#ebedf2] sm:flex px-3 text-sm">
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
      {isLoading ? "Loading..." : renderTabContent()}
    </div>
  );
};

export default SettingPage;
