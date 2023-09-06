"use client";
import AdminSetting from "../../components/organisms/Admin/AdminSetting";
import EmployeeForm from "../../components/template/EmployeeForm";
import { useUserContext } from "../../context/UserContext";

const SettingPage = () => {
  const { user } = useUserContext();
  console.log("🚀 ~ file: page.jsx:8 ~ SettingPage ~ user:", user);

  return user ? (
    user?.role === "admin" ? (
      <AdminSetting />
    ) : (
      <EmployeeForm editMode={true} userData={user} />
    )
  ) : (
    <p>Loading</p>
  );
};

export default SettingPage;
