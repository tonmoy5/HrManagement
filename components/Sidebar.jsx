"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineDollar,
  AiOutlineUser,
} from "react-icons/ai";

import { LiaUserEditSolid } from "react-icons/lia";
import { TbUserShare } from "react-icons/tb";
// Array of links
const links = [
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/" },
  { name: "Employees", icon: AiOutlineUser, href: "/employees" },
  { name: "Attendance", icon: LiaUserEditSolid, href: "/attendance" },
  { name: "Payouts", icon: AiOutlineDollar, href: "/payouts" },
  { name: "Leaves", icon: TbUserShare, href: "/leaves" },
  { name: "Calendar", icon: AiOutlineCalendar, href: "/calendar" },
  // Add more links here
];
const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const startNavigation = (event, href) => {
    if (event.ctrlKey) return;
    if (pathname === href) return;
    const progressBarElement = document.getElementById("progressbar");
    progressBarElement.classList.add("duration-[10000ms]");
    progressBarElement.classList.add("w-[90%]");
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "md:translate-x-0 -translate-x-[265px]"
      } bg-white min-h-screen shadow-2xl absolute top-0 left-0 duration-300 w-[260px]`}
    >
      {/* Sidebar content */}
      <div className={`lg:block ${isOpen ? "block" : "hidden"}`}>
        {/* Sidebar logo */}
        <div className="h-[64px] flex items-center justify-between gap-2 p-4">
          <div className="flex gap-2">
            <Image
              src={"https://html.vristo.sbthemes.com/assets/images/logo.svg"}
              width={30}
              height={30}
              alt="HR_Logo"
            />
            <h1 className="md:text-xl text-base font-bold ">HR Management</h1>
          </div>
          <button
            className="block lg:hidden focus:outline-none"
            onClick={toggleSidebar}
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
        </div>
        <nav className="p-4">
          <ul>
            {links.map((link, index) => (
              <li key={index} className="">
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href ? " bg-slate-200" : ""
                  } flex items-center py-2 px-2 rounded`}
                  onClick={(e) => {
                    startNavigation(e, link.href);
                    toggleSidebar();
                  }}
                >
                  <link.icon className="inline-block text-2xl mr-2" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
