"use client";
import ProfileInfo from "@components/profile/ProfileInfo";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const email = searchParams.get("email") || session?.user.email;
  console.log("🚀 ~ file: page.jsx:15 ~ ProfilePage ~ email:", email);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(`/api/profile?email=${email}`);
      const data = await response.json();
      setUserInfo(data);
      setIsLoading(false);
    };
    getUserInfo();
  }, [email]);

  return (
    <div>
      {isLoading ? (
        <div className="flex gap-3 items-center">
          <ImSpinner3 className="animate-spin" /> Loading...
        </div>
      ) : (
        <ProfileInfo info={userInfo} />
      )}
    </div>
  );
};

export default ProfilePage;
