import Attendance from "@models/attendance";
import Employee from "@models/employee";
import Leave from "@models/leave";
import { connectToDB } from "@utils/database";

const DashboardCards = async () => {
  await connectToDB();
  const totalEmployees = await Employee.countDocuments();
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  const presentEmployees = await Attendance.find({
    date: {
      $gte: currentDate,
      $lt: nextDate,
    },
  }).countDocuments();

  const todayLeaves = await Leave.find({
    $and: [
      { startDate: { $lte: currentDate } }, // Check if startDate is less than or equal to the current date
      { endDate: { $gte: currentDate } }, // Check if endDate is greater than or equal to the current date
    ],
  }).countDocuments();

  const cardData = [
    {
      title: "Total Employees",
      count: totalEmployees,
      style: "bg_green_gradient text-white",
    },
    {
      title: "Today's Presents",
      count: presentEmployees,
      style: "bg_blue_gradient text-white",
    },
    {
      title: "Today's Absents",
      count: totalEmployees - presentEmployees,
      style: "bg_orange_gradient text-white",
    },
    {
      title: "Today's Leave",
      count: todayLeaves,
      style: "bg_red_gradient text-white",
    },
  ];
  return (
    <div className="flex md:flex-row flex-col gap-5 ">
      {cardData.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default DashboardCards;

const Card = ({ card }) => {
  return (
    <div className={`${card.style} p-5 rounded md:w-1/4 w-full shadow-md`}>
      <h3>{card.title}</h3>
      <p className="text-3xl font-bold">{card.count}</p>
    </div>
  );
};
