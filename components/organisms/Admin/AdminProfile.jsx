"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineCoffee, AiOutlineEdit } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { useUserContext } from "../../../context/UserContext";

const AdminProfile = () => {
  const { user } = useUserContext();
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/setting");
  };

  return (
    <div className="md:w-[300px] w-full px-4 py-5 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xl">Profile</h3>
        <div
          onClick={handleEditClick}
          className="p-2 bg-blue-500 text-white rounded-full cursor-pointer shadow-md shadow-blue-500"
        >
          <AiOutlineEdit className="text-xl" />
        </div>
      </div>
      <div className="my-5">
        <Image
          src={
            user.image ||
            "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/22-512.png"
          }
          width={120}
          height={120}
          className="rounded-full cursor-pointer mx-auto w-32 h-32 object-cover"
          alt="user_image"
        />
      </div>
      <div className="text_color flex flex-col gap-3 text-sm items-center">
        <h3 className="text-xl capitalize blue_gradient w-max ">
          {user?.fullName}
        </h3>
        <div className="flex gap-2 items-center">
          <AiOutlineCoffee className="text-lg" />
          <span>{user?.user}</span>
        </div>

        <div className="flex gap-2 items-center">
          <CiMail className="text-lg" />
          <span className="blue_gradient">
            {user?.email || "Not Available"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
