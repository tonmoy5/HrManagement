"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DashboardCards from "../../components/molecules/dashboard/DashboardCards";
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
    {
      title: "Total Due Tasks",
      count: infos.totalDueTasks,
      style: "bg_orange_gradient text-white",
    },
    {
      title: "This Month Leave",
      count: infos.totalLeaves,
      style: "bg_red_gradient text-white",
    },
  ];

  return (
    <>
      <DashboardCards cardData={cardData} isLoading={isLoading} />
      <div className="h-4"></div>
      <TasksPageTemplate />
      <div className="md:flex mt-5">
        {/* Attendance Section */}
        <div className="md:w-1/2 md:pr-4">
          <h2 className="font-bold mb-1 text-xl ml-2 blue_gradient w-max">
            Attendance
          </h2>
          <div className="bg-white p-2 grid grid-cols-3 gap-2 items-center mb-1 text-sm">
            <div>Date</div>
            <div>Check in</div>
            <div>Status</div>
          </div>
          {infos.attendances?.map((item, index) => (
            <AttendanceItem key={index} {...item} />
          ))}
        </div>

        {/* Points Section */}
        <div className="md:w-1/2 md:pl-4">
          <h2 className="font-bold mb-1 text-xl ml-2 blue_gradient w-max">
            Points Transactions
          </h2>
          <div className="bg-white p-2 grid grid-cols-3 gap-2 items-center mb-1 text-sm">
            <div>Date</div>
            <div>Point</div>
            <div>Source</div>
          </div>

          {infos.pointTransactions?.map((item, index) => (
            <PointsItem key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;

const PointsItem = ({ createdAt, points, source }) => (
  <div className="bg-white p-2 grid grid-cols-3 gap-2 items-center mb-1">
    <div className="text-sm font-semibold ">
      {dayjs(createdAt).format("DD MMM, YYYY")}
    </div>
    <div className="text-sm ">{points}</div>
    <div className="text-gay-600 text-xs"> {source}</div>
  </div>
);

const AttendanceItem = ({ date, checkInTime, isLate }) => (
  <div className="bg-white p-2 grid grid-cols-3 gap-2 items-center mb-1">
    <div className="text-sm font-semibold">
      {dayjs(date).format("DD MMM, YYYY")}
    </div>
    <div className="text-sm">
      {new Date(checkInTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      })}
    </div>
    <div
      className={`text-sm text-${isLate === true ? "red-500" : "green-500"}`}
    >
      {isLate ? "Late" : "On Time"}
    </div>
  </div>
);
