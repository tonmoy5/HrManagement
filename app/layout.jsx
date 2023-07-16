import DashboardLayout from "@components/DashboardLayout";
import TopLoadingBar from "@components/TopLoadingBar";
import "@styles/global.css";

export const metadata = {
  title: "HR Management",
  description: "HR Management Software",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <TopLoadingBar />
        <main className="flex text-[#0e1726]">
          <DashboardLayout children={children} />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
