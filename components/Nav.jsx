"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Nav = ({ isOpen, setIsOpen }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  return (
    <div className="h-[64px] bg-white shadow flex items-center justify-end px-5">
      {/* Sidebar toggle button */}
      {!isOpen && (
        <button
          className=" lg:hidden focus:outline-none p-3 h-[64px] flex items-center"
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
          src={"https://html.vristo.sbthemes.com/assets/images/logo.svg"}
          width={30}
          height={30}
          alt="HR_Logo"
        />
        <h1 className="md:text-xl text-base font-bold ">HR Management</h1>
      </div>

      {/* navbar contents */}
      <div className="relative">
        <Image
          src={
            "https://html.vristo.sbthemes.com/assets/images/user-profile.jpeg"
          }
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={() => setIsSettingOpen((prev) => !prev)}
        />
        {isSettingOpen && (
          <div className="flex flex-col gap-3 rounded bg-white shadow-md p-4 absolute top-14 right-0 w-max">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    "https://html.vristo.sbthemes.com/assets/images/user-profile.jpeg"
                  }
                  width={45}
                  height={45}
                  className="rounded-md cursor-pointer"
                />
                <div>
                  <h3 className="font-bold text-sm">Jon Doe</h3>
                  <p className="text_color text-sm">jhondoe@gmail.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
