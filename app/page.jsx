import AttendanceGraph from "@components/AttendanceGraph";
import Attendance from "@models/attendance";
import Employee from "@models/employee";
import Leave from "@models/leave";
import { connectToDB } from "@utils/database";

export const metadata = {
  title: "HRM | Dashboard",
  description: "HR Management Software",
};
const Home = async () => {
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
    <section>
      <div className="flex md:flex-row flex-col gap-5">
        {cardData.map((card, index) => (
          <Card6 key={index} card={card} />
        ))}
      </div>
      <div className="md:flex gap-5 mt-5 w-full">
        <div className="bg-white p-5 shadow-md rounded-md w-full">
          <h3 className="text-lg mb-5 green_gradient">
            Attendance (last 30 days)
          </h3>
          <AttendanceGraph />
        </div>
        <div className="bg-white p-5 shadow-md rounded-md w-full md:mt-0 mt-5">
          <h3 className="text-lg mb-5 orange_gradient">
            Leaves (last 30 days)
          </h3>
          <AttendanceGraph />
        </div>
      </div>
    </section>
  );
};

export default Home;

const Card6 = ({ card }) => {
  return (
    <div className={`${card.style} p-5 rounded md:w-1/4 w-full`}>
      <h3>{card.title}</h3>
      <p className="text-3xl font-bold">{card.count}</p>
    </div>
  );
};
