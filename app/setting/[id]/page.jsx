"use client";
import EmployeeForm from "../../../components/template/EmployeeForm";
import userEmployeeInfo from "../../../hooks/userEmployeeInfo";

const SettingPage = () => {
  const { employeeInfo, isLoading } = userEmployeeInfo();
  if (isLoading) return <div>Loading</div>;
  return <EmployeeForm editMode={true} userData={employeeInfo} />;
};

export default SettingPage;
