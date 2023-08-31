"use client";
import Alert from "@components/Alert";
import AddButton from "@components/atoms/AddButton";
import Button from "@components/atoms/Button";
import TabButton from "@components/atoms/TabButton";
import AccountCredentialsFields from "@components/organisms/Employee/AccountCredentialsFields";
import BankInfoFields from "@components/organisms/Employee/BankInfoFields";
import CompensationInfoFields from "@components/organisms/Employee/CompensationInfoFields";
import EmploymentInfoFields from "@components/organisms/Employee/EmploymentInfoFields";
import PersonalInfoFields from "@components/organisms/Employee/PersonalInfoFields";
import SocialMediaFields from "@components/organisms/Employee/SocialMediaFields";
import { addEmployee } from "@utils/api/employee";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  CiBank,
  CiDollar,
  CiLink,
  CiLock,
  CiMoneyCheck1,
  CiUser,
} from "react-icons/ci";

const INITIAL_DATA = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  address: "",

  designation: "",
  department: "",
  joiningDate: "",
  status: "",

  salary: "",
  allowances: "",
  overtimeRate: "",
  taxInformation: "",

  bankAccount: {
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchInfo: "",
  },

  image: "",
  username: "",
  password: "",

  website: "",
  github: "",
  twitter: "",
  linkedin: "",
};

const AddEmployeePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);

  // load only first time
  useEffect(() => {
    const savedFormData = localStorage.getItem("form-data");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

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
      const response = await addEmployee(formData);
      localStorage.removeItem("form-data");
      setToast({
        active: true,
        message: "Employee added successfully",
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

  useEffect(() => {
    localStorage.setItem("form-data", JSON.stringify(formData));
  }, [formData]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoFields formData={formData} setFormData={setFormData} />
        );
      case "employment":
        return (
          <EmploymentInfoFields formData={formData} setFormData={setFormData} />
        );
      case "bank-info":
        return <BankInfoFields formData={formData} setFormData={setFormData} />;
      case "compensation":
        return (
          <CompensationInfoFields
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "credentials":
        return (
          <AccountCredentialsFields
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "social-media":
        return (
          <SocialMediaFields formData={formData} setFormData={setFormData} />
        );
      default:
        return null;
    }
  };

  const listItems = [
    { id: 1, label: "Personal Info", value: "personal", icon: CiUser },
    {
      id: 2,
      label: "Employment Info",
      value: "employment",
      icon: CiMoneyCheck1,
    },
    {
      id: 3,
      label: "Bank Info",
      value: "bank-info",
      icon: CiBank,
    },
    { id: 4, label: "Compensation", value: "compensation", icon: CiDollar },
    { id: 5, label: "Account Credentials", value: "credentials", icon: CiLock },
    { id: 6, label: "Social Media Links", value: "social-media", icon: CiLink },
  ];

  const handleNext = () => {
    const currentIndex = listItems.findIndex(
      (item) => item.value === activeTab
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < listItems.length) {
      setActiveTab(listItems[nextIndex].value);
    }
  };

  const handlePrevious = () => {
    const currentIndex = listItems.findIndex(
      (item) => item.value === activeTab
    );
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setActiveTab(listItems[previousIndex].value);
    }
  };

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
        Add Employee
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

      <div className="flex justify-between items-center mt-3">
        {activeTab !== "personal" ? (
          <button
            className="px-4 py-1.5 mr-2 bg-gray-200 rounded"
            onClick={handlePrevious}
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        {activeTab !== "social-media" ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <AddButton
            onClick={handleSubmit}
            label={loading ? "Loading..." : "Save"}
            disabled={loading}
          ></AddButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(AddEmployeePage);
