"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Alert from "../../../components/Alert";

const WelcomeAlert = () => {
  const [toast, setToast] = useState({
    active: false,
    message: "Welcome back!",
    className: "bg_green_gradient text-white",
  });
  useEffect(() => {
    if (localStorage.getItem("login") === "true") {
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
