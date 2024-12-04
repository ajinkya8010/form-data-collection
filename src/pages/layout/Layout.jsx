import {Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomePage from "../homePage/HomePage";

function Layout() {
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <HomePage/>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
