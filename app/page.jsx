"use client";
import AttendanceGraph from "../components/dashboard/AttendanceGraph";
import DashboardCards from "../components/dashboard/DashboardCards";
import LeavesGraph from "../components/dashboard/LeaveGraph";
import WelcomeAlert from "../components/dashboard/WelcomeAlert";
import { useUserContext } from "../context/UserContext";

// export const metadata = {
//   title: "HRM | Dashboard",
//   description: "HR Management Software",
// };

const Home = () => {
  const { user } = useUserContext();
  return (
    <section className="w-full">
      <WelcomeAlert />
      {user.role === "employee" ? (
        <div>Employee Dashboard</div>
      ) : (
        <>
          <DashboardCards />
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
        </>
      )}
    </section>
  );
};

export default Home;
