import React, { useContext, useEffect, useState } from "react";
import { UserLogedContext } from "../../context/UserLogedContext";
import { useLocation, useNavigate } from "react-router-dom";
import bgimage from '../../assets/home_bg.jpg'

export default function Navbar() {
  // to chanck whether user login state changes or not
  const { isUserLoged, setIsUserLoged } = useContext(UserLogedContext);

  // to check weather we are on result page or not
  const location = useLocation();
  const pathIncludesResult = location.pathname.includes("result");

  // for navigation
  const navigate = useNavigate();

  // to hold user data
  const [user, setUser] = useState({
    image: "",
  });

  // to get user data
  useEffect(() => {
    const togetUser = async () => {
      if (localStorage.getItem("usertoken")) {
        const url = `${process.env.REACT_APP_BACKEND_IP}/user/userAuthtokenLogin`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            usertoken: localStorage.getItem("usertoken"),
          },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (data.signal === "green") {
          setUser(data.user);
        }
      }
    };
    togetUser();
  }, [location.pathname, isUserLoged]);

  // navigation buttons
  const navButtons = (txt) => {
    return (
      <button className="decoration-0 hover:border-b-indigo-500 border-2 text-lg font-bold active:text-sm">
        {txt}
      </button>
    );
  };

  // list of buttons for center
  const navLabels = ["Home", "How to use", "Help"];

  return (
    <div className=" relative sm:h-[10vh] flex flex-row justify-between items-center px-[5vw]  z-50">
            

      {/* logo division  */}
      <div className="h-[80%] border-red-800 border-2 sm:w-[15%]">logo</div>

      {/* navigation  */}
      <div className="flex flex-row gap-5">
        {navLabels?.map((labal) => navButtons(labal))}
      </div>

      {/* login button  */}
      <div className="h-[70%] sm:w-[12%]">
        <button className="h-[100%] w-[100%] z-10 btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 text-[1.2rem]">Login</button>
      </div>
    </div>
  );
}
