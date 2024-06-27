import React, { useContext, useEffect, useState } from "react";
import { UserLogedContext } from "../../context/UserLogedContext";
import { useLocation, useNavigate } from "react-router-dom";

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

  // login click 
  const handleLoginClick = () =>{
    if(localStorage.getItem('usertoken')){
      navigate('/result');
    }
    else{
      navigate('/login')
    }
  }

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
      <button className="border-transparent hover:border-b-indigo-500 border-2 text-lg font-medium active:text-sm">
        {txt}
      </button>
    );
  };

  //  toggle click
  const toggleClick = () => {
    document.getElementById("toolbar").classList.toggle("hidden");
    document.getElementById("rightarr").classList.toggle("hidden");
    document.getElementById("bottomarr").classList.toggle("hidden");
  };
  // list of buttons for center
  const navLabels = ["Home", "How to use", "Help", "Documentation"];

  return (
    <div className=" relative z-[1000] top-0 left-0 sm:h-[11.5vh] border-gray-300 border-b-2 rounded-lg  flex flex-row justify-between items-center px-[5vw] pt-1">
      {/* logo division  */}
      <div className="h-[80%] border-red-800 border-2 sm:w-[15%]">logo</div>

      {/* navigation  */}
      <div className="flex flex-row gap-5">
        {navLabels?.map((labal) => navButtons(labal))}
      </div>

      {/* login button  or avtar */}
      <div className="h-[100%] sm:w-[20%]  overflow-hidden flex items-center justify-end cursor-pointer">
        {pathIncludesResult ? (
          <div
            onClick={toggleClick}
            onBlur={toggleClick}
            className="dropdown dropdown-end flex flex-row gap-3 items-center"
          >
            <div class="avatar indicator">
              <span class="indicator-item indicator-bottom badge badge-primary size-4"></span>
              <div class="w-15 h-[55px] rounded-xl border-gray-300 border-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div>
              <div className="text-lg text-blue-500 drop-shadow-lg shadow-blue-500/50 ">Rohanshu </div>
              <div className="text-bold">rb@contractify.com </div>
            </div>
            <div id="rightarr" className="text-lg ">
              {" "}
              &#x27A4;{" "}
            </div>
            <div id="bottomarr" className="text-lg hidden">
              {" "}
              &#8659;{" "}
            </div>
          </div>
        ) : (
          <button onClick={handleLoginClick} className="h-[70%] w-[50%] z-10 btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 text-[1.2rem]">
            Login
          </button>
        )}
      </div>

      {/* iteam bar  */}
      <ul
        id="toolbar"
        tabIndex={0}
        className=" border-gray-300 rounded-sm p-2 border-2 shadow-md w-[15%] absolute top-[12vh] right-[5vw] hidden text-md"
      >
        <li
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="hover:bg-blue-500 hover:text-white rounded-sm pl-1 cursor-pointer"
        >
          <a>Settings</a>
        </li>
        <li
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="hover:bg-blue-500 hover:text-white rounded-sm pl-1 cursor-pointer"
        >
          <a>History</a>
        </li>
        <li
          onClick={() => {localStorage.removeItem('usertoken'); navigate('/'); toggleClick()}}
          className="hover:bg-blue-500 hover:text-white rounded-sm pl-1 cursor-pointer"
        >
          <a>Logout</a>
        </li>
      </ul>

      {/* modals  */}
      {/* 1 */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Settings</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>

      {/* 2 */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Your History</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>

    </div>
  );
}
