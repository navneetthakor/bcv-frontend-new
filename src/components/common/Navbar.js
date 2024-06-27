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
      <button className="border-transparent hover:border-b-indigo-500 border-2 text-lg font-bold active:text-sm">
        {txt}
      </button>
    );
  };

  // list of buttons for center
  const navLabels = ["Home", "How to use", "Help"];

  return (
    <div className=" relative sm:h-[12vh]  flex flex-row justify-between items-center px-[5vw] pt-2 z-50">
            

      {/* logo division  */}
      <div className="h-[80%] border-red-800 border-2 sm:w-[15%]">logo</div>

      {/* navigation  */}
      <div className="flex flex-row gap-5">
        {navLabels?.map((labal) => navButtons(labal))}
      </div>

      {/* login button  or avtar */}
      <div className="h-[100%] sm:w-[20%]  overflow-hidden">
      {pathIncludesResult ? 
      <div className="flex flex-row gap-3 items-center">

        <div class="avatar indicator">
        <span class="indicator-item indicator-bottom badge badge-primary"></span>
        <div class="w-15 h-[55px] rounded-xl">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
        </div>
      </div>

      <div>
        <div className="text-lg">Rohanshu </div>
        <div className="text-bold">rb@contractify.com </div>
        </div>
        <div className="text-lg"> &#x27A4; </div>
      </div>
      :
      
        <button className="h-[100%] w-[100%] z-10 btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 text-[1.2rem]">Login</button>
      }
      </div>
    </div>
  );
}
