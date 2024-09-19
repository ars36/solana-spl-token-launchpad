import { Outlet } from "react-router-dom";
// import Footer from "./footer";
import Header from "./header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
