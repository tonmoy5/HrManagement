import Provider from "../components/Provider";
import TopLoadingBar from "../components/TopLoadingBar";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { UserProvider } from "../context/UserContext";
import "../styles/global.css";
export const metadata = {
  title: {
    template: "HRM | %s ",
    default: "HRM",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <TopLoadingBar />
        <main className=" text-[#0e1726]">
          <Provider>
            <UserProvider>
              <DashboardLayout children={children} />
            </UserProvider>
          </Provider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
