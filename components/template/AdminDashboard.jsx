"use client";
import AttendanceGraph from "../../components/dashboard/AttendanceGraph";
import DashboardCards from "../../components/dashboard/DashboardCards";
import LeavesGraph from "../../components/dashboard/LeaveGraph";

const AdminDashboard = () => {
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
    <>
      <DashboardCards cardData={cardData} isLoading={isLoading} />
      <div className="md:flex md:flex-wrap gap-5 mt-5 w-full">
        <div className="md:w-[47%] bg-white p-5 shadow-md rounded-md w-[98%]">
          <h3 className="text-lg mb-5 green_gradient font-semibold">
            Attendance (last 30 days)
          </h3>
          <AttendanceGraph />
        </div>
        <div className="md:w-[47%] bg-white p-5 shadow-md rounded-md w-[98%] md:mt-0 mt-5">
          <h3 className="text-lg mb-5 orange_gradient font-semibold">
            Leaves (last 30 days)
          </h3>
          <LeavesGraph />
        </div>
      </div>
      {/* <div className="md:flex gap-5 mt-5 w-full">
        <div className="md:w-[47%] w-full p-5 bg-white shadow-md rounded-md">
          <h3 className="blue_gradient mb-2 font-semibold">Departments</h3>
          <DepartmentList />
        </div>
        <div className="md:w-[47%] w-full  p-5 bg-white shadow-md rounded-md md:mt-0 mt-5">
          <h3 className="green_gradient mb-2 font-semibold">Designations</h3>
          <DesignationList />
        </div>
      </div> */}
    </>
  );
};

export default AdminDashboard;
