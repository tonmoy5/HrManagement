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

import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdArrowForwardIos } from "react-icons/md";
import { TbUserShare } from "react-icons/tb";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// Array of links
const links = [
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/" },
  {
    name: "Employee",
    icon: AiOutlineUser,
    submenu: [
      { name: "Designation", href: "/employee/designation" },
      { name: "Add Employee", href: "/employee/add" },
      { name: "Manage Employee", href: "/employee" },
    ],
  },
  {
    name: "Department",
    icon: HiOutlineOfficeBuilding,
    href: "/department",
  },
  {
    name: "Attendance",
    icon: LiaUserEditSolid,
    submenu: [
      { name: "Attendance Form", href: "/attendance/form" },
      { name: "Attendance Log", href: "/attendance" },
    ],
  },
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

  const findActiveSubmenu = links.findIndex((l) => {
    const pathArray = l?.submenu?.map((e) => e.href) || [];
    return pathArray?.includes(pathname);
  });

  const [expanded, setExpanded] = useState(
    findActiveSubmenu === -1 ? 0 : findActiveSubmenu
  );
  return (
    <div
      className={`${
        isOpen
          ? "translate-x-0 fixed"
          : "md:translate-x-0 -translate-x-[265px] md:fixed absolute"
      } bg-white min-h-screen shadow-2xl top-0 left-0 duration-300 w-[260px] z-20`}
    >
      {/* Sidebar content */}
      <div className={`md:block ${isOpen ? "block" : "hidden"}`}>
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
            className="block md:hidden focus:outline-none"
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
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`${
                      pathname === link.href ? " bg-slate-300" : ""
                    } flex items-center py-2 px-2 rounded duration-300`}
                    onClick={(e) => {
                      startNavigation(e, link.href);
                      toggleSidebar();
                      setExpanded(false);
                    }}
                  >
                    <link.icon className="inline-block text-2xl mr-2" />
                    {link.name}
                  </Link>
                ) : (
                  <Accordion
                    i={index}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    link={link}
                    pathname={pathname}
                    startNavigation={startNavigation}
                    toggleSidebar={toggleSidebar}
                    activeSubmenuIndex={findActiveSubmenu}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;

const Accordion = ({
  i,
  expanded,
  setExpanded,
  link,
  pathname,
  startNavigation,
  toggleSidebar,
  activeSubmenuIndex,
}) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={false}
        // animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className={`flex items-center justify-between py-2 px-2 rounded cursor-pointer ${
          activeSubmenuIndex === i && " bg-slate-200"
        }`}
      >
        <div>
          <link.icon className="inline-block text-2xl mr-2" />
          {link.name}
        </div>
        <MdArrowForwardIos
          className={`${expanded === i && "rotate-90"} duration-300`}
        />
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 1, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="flex flex-col ml-4 "
          >
            {link.submenu.map((subLink, index) => (
              <div
                key={index}
                className="flex items-center border-l-2 border-slate-200"
              >
                <div className="w-2 border-b-2 border-slate-200"></div>
                <Link
                  href={subLink.href}
                  className={`${
                    pathname === subLink.href ? " bg-slate-300" : ""
                  } flex items-center py-1.5 pl-3 rounded flex-1`}
                  onClick={(e) => {
                    startNavigation(e, subLink.href);
                    toggleSidebar();
                  }}
                >
                  {subLink.name}
                </Link>
              </div>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
