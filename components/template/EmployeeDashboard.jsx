"use client";
import { useEffect, useState } from "react";
import DashboardCards from "../../components/dashboard/DashboardCards";
import TasksPageTemplate from "../template/TaskPageTemplate";

const EmployeeDashboard = () => {
  const [infos, setInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setInfos(data))
      .finally(() => {
        setIsLoading(false);
      });
    return () => {};
  }, []);

  const cardData = [
    {
      title: "Total Points",
      count: infos.totalEmployees,
      style: "bg_green_gradient text-white",
    },
    {
      title: "This Month Presents ",
      count: infos.presentEmployees,
      style: "bg_blue_gradient text-white",
    },
    {
      title: "This Month Absents",
      count: infos.totalEmployees - infos.presentEmployees,
      style: "bg_orange_gradient text-white",
    },
    {
      title: "This Month Leave",
      count: infos.todayLeaves,
      style: "bg_red_gradient text-white",
    },
  ];
  return (
    <>
      <DashboardCards cardData={cardData} isLoading={isLoading} />
      <div className="h-4"></div>
      <TasksPageTemplate />
    </>
  );
};

export default EmployeeDashboard;
