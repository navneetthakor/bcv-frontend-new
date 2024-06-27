import React from "react";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import bgimage from "../assets/home_bg.jpg"

export default function RootLayout() {
  return (
    <div data-theme="mytheme" style={{minHeight: '100vh', width: '100vw'}} >
      <img src={bgimage} alt="" class="absolute -top-0 -left-0 h-[100vh] w-[100vw]" />
      <Navbar />
      <Outlet />
    </div>
  );
}
