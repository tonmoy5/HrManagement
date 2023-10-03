"use client";
import { useEffect, useState } from "react";
import DashboardCards from "../../components/dashboard/DashboardCards";
import TasksPageTemplate from "../template/TaskPageTemplate";

const EmployeeDashboard = () => {
  const [infos, setInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/employee", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setInfos(data))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
    return () => {};
  }, []);

  const cardData = [
    {
      title: "Total Points",
      count: infos.totalPoints,
      style: "bg_green_gradient text-white",
    },
    {
      title: "This Month Presents ",
      count: infos.totalPresentAttendance,
      style: "bg_blue_gradient text-white",
    },
    // {
    //   title: "This Month Absents",
    //   count: 0,
    //   style: "bg_orange_gradient text-white",
    // },
    {
      title: "This Month Leave",
      count: infos.totalLeaves,
      style: "bg_red_gradient text-white",
    },
  ];
  console.log(
    "🚀 ~ file: EmployeeDashboard.jsx:42 ~ EmployeeDashboard ~ cardData:",
    cardData
  );
  return (
    <>
      <DashboardCards cardData={cardData} isLoading={isLoading} />
      <div className="h-4"></div>
      <TasksPageTemplate />
    </>
  );
};

export default EmployeeDashboard;
