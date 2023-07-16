"use client";
import Nav from "@components/Nav";
import Sidebar from "@components/Sidebar";
import "@styles/global.css";
import { useEffect, useRef, useState } from "react";

export const metadata = {
  title: "HR Management",
  description: "HR Management Software",
};

const RootLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <main className="flex text-[#0e1726]">
          <div ref={sidebarRef} className={`relative md:w-[260px] w-0`}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className="flex flex-1 flex-col bg-[#fafafa] min-h-screen">
            <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="p-5">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
