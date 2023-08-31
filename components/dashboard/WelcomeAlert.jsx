"use client";

import Alert from "@components/Alert";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const WelcomeAlert = () => {
  console.log("welcome alter ");
  const [toast, setToast] = useState({
    active: false,
    message: "Welcome back admin!",
    className: "bg_green_gradient text-white",
  });
  useEffect(() => {
    if (localStorage.getItem("login") === "true") {
      console.log("login success");
      setToast((p) => ({ ...p, active: true }));
      localStorage.removeItem("login");
    }
  }, []);

  return (
    <AnimatePresence>
      {toast.active && (
        <Alert
          className={toast.className}
          handleClose={() => setToast({ active: false, message: "" })}
          isAlertOpen={toast.active}
          message={toast.message}
        />
      )}
    </AnimatePresence>
  );
};

export default WelcomeAlert;
