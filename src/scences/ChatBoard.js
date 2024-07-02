import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

export default function ChatBoard() {
  // for navigation
  const navigate = useNavigate();

  // if user not logged in
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      navigate("/login");
    }
  });

  // actual returning data ---------
  return (
    <div className="w-[100%] h-[88vh] flex justify-around relative z-1 pt-5 overflow-y-clip">
      {/* sidebar */}
      <ul className="menu bg-base-200 rounded-box w-[15vw] h-[22vh] bg-transparent shadow-lg border-[1px] border-gray-500 shadow-blue-500/50 pt-5">
        <li>
          <a className="bg-blue-500 text-white">
          <CiChat1 size={20} color="white"/>
          Chat Board
          </a>
        </li>
        <li
        onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <a>
          <GoHistory size={20}/>
            History
          </a>
        </li>
        <li
        onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <a>
          <IoSettingsOutline size={20}/>
            Settings
          </a>
        </li>
      </ul>

      {/* chat area  */}
      <div
        style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(8px)",
        }}
        class="overflow-y-scroll rounded-lg shadow-xl border-[1px] border-gray-500 shadow-blue-500/50 h-[83vh] w-[70vw] p-2 pt-5"
      >
        {/* inital text by ai  */}
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://cdn1.expresscomputer.in/wp-content/uploads/2023/04/04130957/EC_Artificial_Intelligence_AI_750.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble bg-blue-500 text-white">
            Send me pdf so that, I can anaylys it!!!
          </div>
        </div>
      </div>
      {/* button  */}
      <div
        onClick={() => document.getElementById("company_modal").showModal()}
        className="fixed z-[100] bottom-[8vh] left-[43vw] border hover:bg-blue-600 bg-blue-500 w-[40vw] h-[7vh] shadow-blue-500 border-none shadow-lg flex items-center justify-center text-white font-bold rounded-lg cursor-pointer"
      >
        Upload Document
      </div>

      <dialog id="company_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Select Method</h3>
          <ul className="menu  bg-base-200 rounded-box w-[100%] mt-2">
            <li>
              <details open>
                <summary>Master Template</summary>
                <ul>
                  <li>
                    <a>Template 1</a>
                  </li>
                  <li>
                    <a>Template 2</a>
                  </li>
                  <li>
                    <a>Template 3</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Company Template</summary>
                <ul>
                  <li>
                    <details>
                      <summary>Amazon</summary>
                      <ul>
                        <li>
                          <a>version-1</a>
                        </li>
                        <li>
                          <a>version-2</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>Google</summary>
                      <ul>
                        <li>
                          <a>version-1</a>
                        </li>
                        <li>
                          <a>version-2</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </dialog>
    </div>
  );
}
