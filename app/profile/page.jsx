"use client";
import ProfileInfo from "@components/profile/ProfileInfo";
import useProfileInfo from "@hooks/useProfileInfo";

const ProfilePage = () => {
  const { userInfo, isLoading } = useProfileInfo();

  return (
    <div>
      {isLoading ? (
        <div className="flex gap-3 items-center">Loading...</div>
      ) : (
        <ProfileInfo info={userInfo} />
      )}
    </div>
  );
};

export default ProfilePage;
