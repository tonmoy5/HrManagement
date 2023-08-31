import { getProfileData } from "@utils/api/profile";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useProfileInfo = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const email = searchParams.get("email") || session?.user.email;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await getProfileData(email);

        setUserInfo(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getUserInfo();
  }, [email]);
  return { userInfo, setUserInfo, isLoading };
};

export default useProfileInfo;
