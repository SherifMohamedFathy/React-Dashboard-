import React from "react";
import TopBar from "../../Components/TopBar";
import SideBar from "../../Components/SideBar";
import "./dashboard.css";

import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <div className="table-100" style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
