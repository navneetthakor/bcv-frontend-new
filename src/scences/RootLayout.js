import React from "react";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div data-theme="mytheme" style={{height: '100%', width: '100%'}} >
      <Navbar />
      <Outlet />
    </div>
  );
}
