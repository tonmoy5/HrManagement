"use client";
import React from "react";
import { useUserContext } from "../../context/UserContext";
import AdminDashboard from "./AdminDashboard";

const DashboardPage = () => {
  const { user } = useUserContext();
  return (
    <>
      {user.role === "employee" ? (
        <h1>Employee Dashboard</h1>
      ) : (
        <AdminDashboard />
      )}
    </>
  );
};

export default DashboardPage;
