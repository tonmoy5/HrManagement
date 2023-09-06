"use client";
import AdminProfile from "../../components/organisms/admin/AdminProfile";
import EmployeeProfile from "../../components/organisms/EmployeeProfile";
import { useUserContext } from "../../context/UserContext";

const ProfilePage = () => {
  const { user } = useUserContext();

  return (
    <div>
      {user?.role === "admin" ? (
        <AdminProfile info={user} />
      ) : (
        <EmployeeProfile info={user} />
      )}
    </div>
  );
};

export default ProfilePage;
