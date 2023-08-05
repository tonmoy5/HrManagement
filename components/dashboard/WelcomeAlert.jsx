"use client";

import Alert from "@components/Alert";
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
    <Alert
      className={toast.className}
      isAlertOpen={toast.active}
      handleClose={() => setToast((p) => ({ ...p, active: false }))}
      message={toast.message}
    />
  );
};

export default WelcomeAlert;
