"use client";
import EmployeeProfile from "../../../components/organisms/EmployeeProfile";
import userEmployeeInfo from "../../../hooks/userEmployeeInfo";

const ProfilePage = () => {
  const { employeeInfo, isLoading } = userEmployeeInfo();

  return (
    <div>
      {isLoading ? (
        <div className="flex gap-3 items-center">Loading...</div>
      ) : (
        <EmployeeProfile info={employeeInfo} />
      )}
    </div>
  );
};

export default ProfilePage;
