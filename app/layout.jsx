import "@styles/global.css";

import Nav from "@components/Nav";

export const metadata = {
  title: "HR Management",
  description: "HR Management Software",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <main>
        <Nav />
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
