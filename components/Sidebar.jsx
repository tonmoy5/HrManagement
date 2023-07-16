"use client";
import Image from "next/image";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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

        {/* Sidebar links */}
        <nav className="p-4">
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-white">
                Link 1
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-white">
                Link 2
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-white">
                Link 3
              </a>
            </li>
            {/* Add more sidebar links */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
