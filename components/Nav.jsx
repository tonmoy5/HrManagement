"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useUserContext } from "../context/UserContext";
import useOutsideClick from "../hooks/useOutsideClick";

const Nav = ({ isOpen, setIsOpen }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  console.log("🚀 ~ file: Nav.jsx:18 ~ Nav ~ user:", user);
  const router = useRouter();

  const profileMenuRef = useRef(null);

  useOutsideClick(profileMenuRef, () => {
    setIsSettingOpen(false);
  });

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await fetch("/api/logout", { method: "POST" });
      // Redirect to the login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const userAvatar =
    user?.image ||
    "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/22-512.png";

  return (
    <div className="h-[64px] bg-white shadow flex items-center justify-between px-5 fixed top-0 left-0 w-full z-10">
      {/* Sidebar toggle button */}
      <div className="flex gap-3 items-center">
        {!isOpen && (
          <button
            className="md:hidden focus:outline-none h-[64px] flex items-center"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        )}
        <div className="md:hidden flex gap-2">
          <Image
            src={"/logo.svg"}
            width={30}
            height={30}
            alt="HR_Logo"
            className="w-[30px] h-[30px] object-cover"
          />
          <h1 className="md:text-xl text-base font-bold">HR Management</h1>
        </div>
      </div>

      {/* navbar contents */}
      <div ref={profileMenuRef} className="relative">
        <Image
          src={userAvatar}
          width={40}
          height={40}
          className="rounded-full cursor-pointer w-[40px] h-[40px] object-cover"
          onClick={() => setIsSettingOpen((prev) => !prev)}
          alt="user-profile"
        />
        <AnimatePresence>
          {isSettingOpen && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col rounded bg-white shadow-md absolute top-14 right-0 w-max"
            >
              <div className="flex items-center gap-3 p-4">
                <Image
                  src={userAvatar}
                  width={45}
                  height={45}
                  className="rounded-md cursor-pointer  w-[45px] h-[45px] object-cover"
                  alt="user_image"
                />
                <div>
                  <h3 className="font-bold text-sm capitalize">
                    {user?.fullName}
                  </h3>
                  <p className="text_color text-sm">{user?.email}</p>
                </div>
              </div>
              <ul className="">
                <li className="">
                  <Link
                    href={"/profile"}
                    className=" py-2 px-4 hover:bg-indigo-100 hover:text-indigo-500 w-full text-sm flex items-center gap-2"
                  >
                    <FaRegUser className="text-lg" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/setting"}
                    className=" py-2 px-4 hover:bg-indigo-100 hover:text-indigo-500 w-full text-sm flex items-center gap-2"
                  >
                    <AiOutlineSetting className="text-lg" />
                    Setting
                  </Link>
                </li>
              </ul>
              <div className="border-t w-full"></div>
              <button
                onClick={handleSignOut}
                className=" py-3 px-4 hover:bg-indigo-100 hover:text-indigo-500 w-full text-sm flex items-center gap-2 text-red-500"
              >
                {isLoading ? (
                  <FiLoader className="text-lg animate-spin" />
                ) : (
                  <CiLogout className="text-lg" />
                )}
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Nav;
