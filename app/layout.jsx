import DashboardLayout from "@components/DashboardLayout";
import TopLoadingBar from "@components/TopLoadingBar";
import "@styles/global.css";
export const metadata = {
  title: {
    template: "HRM | %s ",
    default: "HRM", // a default is required when creating a template
  },
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
