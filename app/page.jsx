import WelcomeAlert from "../components/dashboard/WelcomeAlert";
import DashboardPage from "../components/template/DashboardPage";

export const metadata = {
  title: "HRM | Dashboard",
  description: "HR Management Software",
};

const Home = async () => {
  return (
    <section className="w-full">
      <WelcomeAlert />
      <DashboardPage />
    </section>
  );
};

export default Home;
