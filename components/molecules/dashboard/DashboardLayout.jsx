"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useNavigationEvent } from "../../../hooks/useNavigationEvent";
import useOutsideClick from "../../../hooks/useOutsideClick";
import Nav from "../../Nav";
import Preloader from "../../PreLoader";
import Sidebar from "../../Sidebar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, loading } = useUserContext();

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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
    if (
      status !== "loading" &&
      (status === "unauthenticated" || status === "authenticated")
    ) {
      document.getElementById("loader").classList.add("exit-loader");
      document.getElementById("loader-text").classList.add("loader-text-exit");
    }
  }, [status]);

  return (
    <>
      <Preloader />
      {pathname === "/auth/login"
        ? children
        : status === "authenticated" &&
          user && (
            <div className="flex">
              <div ref={sidebarRef} className={`relative md:w-[260px] w-0`}>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
              <div className="flex flex-1 flex-col bg-[#fafafa] min-h-screen relative">
                <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="md:p-5 p-2 mt-[64px]">{children}</div>
              </div>
            </div>
          )}
    </>
  );
};

export default DashboardLayout;
