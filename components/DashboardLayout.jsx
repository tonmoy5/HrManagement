"use client";

import { useNavigationEvent } from "@hooks/useNavigationEvent";
import useOutsideClick from "@hooks/useOutsideClick";
import { useRef, useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, () => {
    setIsOpen(false);
  });

  useNavigationEvent(() => {
    const progressBarElement = document.getElementById("progressbar");
    progressBarElement.classList.add("w-full");
    progressBarElement.classList.remove("duration-[10000ms]");
    progressBarElement.classList.add("duration-100");
    setTimeout(() => {
      progressBarElement.classList.remove("w-full");
      progressBarElement.classList.remove("w-[90%]");
      progressBarElement.classList.remove("duration-100");
    }, 1000);
  });

  return (
    <>
      <div ref={sidebarRef} className={`relative md:w-[260px] w-0`}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="flex flex-1 flex-col bg-[#fafafa] min-h-screen">
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="p-5">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
