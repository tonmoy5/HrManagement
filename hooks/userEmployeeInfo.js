import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEmployeeById } from "../utils/api/employee";

const userEmployeeInfo = () => {
  const { data: session } = useSession();

  const [employeeInfo, setEmployeeInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const id = useParams()?.id || session?.user.id;

  useEffect(() => {
    const getEmployeeInfo = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployeeInfo(data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    if (id) getEmployeeInfo();
  }, [id]);
  return { employeeInfo, setEmployeeInfo, isLoading };
};

export default userEmployeeInfo;
