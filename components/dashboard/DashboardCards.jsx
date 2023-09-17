"use client";
import { useEffect, useState } from "react";

const DashboardCards = () => {
  const [infos, setInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard",  {cache:'no-store'})
      .then((res) => res.json())
      .then((data) => setInfos(data))
      .finally(() => {
        setIsLoading(false);
      });
    return () => {};
  }, []);

  const cardData = [
    {
      title: "Total Employees",
      count: infos.totalEmployees,
      style: "bg_green_gradient text-white",
    },
    {
      title: "Today's Presents",
      count: infos.presentEmployees,
      style: "bg_blue_gradient text-white",
    },
    {
      title: "Today's Absents",
      count: infos.totalEmployees - infos.presentEmployees,
      style: "bg_orange_gradient text-white",
    },
    {
      title: "Today's Leave",
      count: infos.todayLeaves,
      style: "bg_red_gradient text-white",
    },
  ];
  return (
    <div className="flex md:flex-row flex-col gap-5 ">
      {cardData.map((card, index) => (
        <Card key={index} card={card} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default DashboardCards;

const Card = ({ card, isLoading }) => {
  return (
    <div className={`${card.style} p-5 rounded md:w-1/4 w-full shadow-md`}>
      <h3>{card.title}</h3>

      {isLoading ? (
        <div className="h-4 rounded bg-gray-200 w-14 my-2.5 animate-pulse"></div>
      ) : (
        <p className="text-3xl font-bold">{card.count}</p>
      )}
    </div>
  );
};
