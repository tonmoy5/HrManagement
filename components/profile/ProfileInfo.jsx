"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineCoffee, AiOutlineEdit } from "react-icons/ai";
import { CiCalendarDate, CiLocationOn, CiMail } from "react-icons/ci";
import { PiPhoneCallLight } from "react-icons/pi";

const ProfileInfo = ({ info }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const df = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleEditClick = () => {
    if (info?.email === session.user.email) {
      router.push("/");
    } else {
      router.push(`/employee/edit/${info.employeeId}`);
    }
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
            info.image ||
            "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/22-512.png"
          }
          width={120}
          height={120}
          className="rounded-full cursor-pointer mx-auto"
          alt="user_image"
        />
      </div>
      <div className="text_color flex flex-col gap-3 text-sm items-center">
        <h3 className="text-xl capitalize blue_gradient w-max ">
          {info?.fullName || "Admin"}
        </h3>
        <div className="flex gap-2 items-center">
          <AiOutlineCoffee className="text-lg" />
          <span>{info?.designation || "Not Available"}</span>
        </div>
        <div className="flex gap-2 items-center">
          <CiCalendarDate className="text-lg" />
          <span>
            {info?.joiningDate !== "Not Available"
              ? df.format(new Date(info?.joiningDate))
              : "Not Available"}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <CiLocationOn className="text-lg" />
          <span>{info?.address || "Not Available"}</span>
        </div>
        <div className="flex gap-2 items-center">
          <CiMail className="text-lg" />
          <span className="blue_gradient">
            {info?.email || "Not Available"}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <PiPhoneCallLight className="text-lg" />
          <span className="">{info?.phone || "Not Available"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
