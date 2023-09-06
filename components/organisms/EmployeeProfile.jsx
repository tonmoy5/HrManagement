"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineCoffee, AiOutlineEdit } from "react-icons/ai";
import { CiCalendarDate, CiLocationOn, CiMail } from "react-icons/ci";
import { PiPhoneCallLight } from "react-icons/pi";

const EmployeeProfile = ({ info }) => {
  const { data: session } = useSession();
  const {
    email,
    image,
    _id,
    fullName,
    designation,
    joiningDate,
    address,
    phone,
  } = info || {};
  const router = useRouter();
  const df = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleEditClick = () => {
    if (email === session.user.email) {
      router.push("/setting");
    } else {
      router.push(`/setting/${_id}`);
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
            image ||
            "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/22-512.png"
          }
          width={120}
          height={120}
          className="rounded-full cursor-pointer mx-auto w-32 h-32 object-cover"
          alt="user_image"
        />
      </div>
      <div className="text_color flex flex-col gap-3 text-sm items-center">
        <h3 className="text-xl capitalize blue_gradient w-max ">{fullName}</h3>
        <div className="flex gap-2 items-center">
          <AiOutlineCoffee className="text-lg" />
          <span>{designation?.title}</span>
        </div>
        <div className="flex gap-2 items-center">
          <CiCalendarDate className="text-lg" />
          <span>
            {joiningDate !== "Not Available"
              ? df.format(new Date(info?.joiningDate || 0))
              : "Not Available"}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <CiLocationOn className="text-lg" />
          <span>{address || "Not Available"}</span>
        </div>
        <div className="flex gap-2 items-center">
          <CiMail className="text-lg" />
          <span className="blue_gradient">{email}</span>
        </div>
        <div className="flex gap-2 items-center">
          <PiPhoneCallLight className="text-lg" />
          <span className="">{phone}</span>
        </div>
      </div>
      <ul className="mt-7 flex items-center justify-center gap-2">
        <li>
          <a
            className="bg-blue-500 text-white shadow shadow-blue-500 flex h-10 w-10 items-center justify-center rounded-full p-0"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              stroke-linejoin="round"
              className="h-5 w-5"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            className="bg-red-600 text-white shadow shadow-red-500 flex h-10 w-10 items-center justify-center rounded-full p-0"
            href="#"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3.33946 16.9997C6.10089 21.7826 12.2168 23.4214 16.9997 20.66C18.9493 19.5344 20.3765 17.8514 21.1962 15.9286C22.3875 13.1341 22.2958 9.83304 20.66 6.99972C19.0242 4.1664 16.2112 2.43642 13.1955 2.07088C11.1204 1.81935 8.94932 2.21386 6.99972 3.33946C2.21679 6.10089 0.578039 12.2168 3.33946 16.9997Z"
                stroke="currentColor"
                strokeWidth="1.5"
              ></path>
              <path
                opacity="0.5"
                d="M16.9497 20.5732C16.9497 20.5732 16.0107 13.9821 14.0004 10.5001C11.99 7.01803 7.05018 3.42681 7.05018 3.42681M7.57711 20.8175C9.05874 16.3477 16.4525 11.3931 21.8635 12.5801M16.4139 3.20898C14.926 7.63004 7.67424 12.5123 2.28857 11.4516"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            className="bg-gray-600 text-white shadow shadow-gray-500 flex h-10 w-10 items-center justify-center rounded-full p-0"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              stroke-linejoin="round"
              className="h-5 w-5"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeProfile;
