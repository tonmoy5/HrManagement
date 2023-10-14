"use client";

import WelcomeAlert from "../components/molecules/dashboard/WelcomeAlert";
import AdminDashboard from "../components/template/AdminDashboard";
import EmployeeDashboard from "../components/template/EmployeeDashboard";
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
        <EmployeeDashboard />
      ) : (
        <>
          <AdminDashboard />
        </>
      )}
    </section>
  );
};

export default Home;
