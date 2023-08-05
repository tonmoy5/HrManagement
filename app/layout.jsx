import DashboardLayout from "@components/dashboard/DashboardLayout";
import Provider from "@components/Provider";
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
        <main className=" text-[#0e1726]">
          <Provider>
            <DashboardLayout children={children} />
          </Provider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
