import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Deviations } from "../components/chatBoard/main";

export default function ChatBoard() {
  // for navigation
  const navigate = useNavigate();
  // to store templates and userHistory companies
  const dummyResult = {
    uploaded_pdf: "",
    highlighted_pdf: "",
    summary: "",
    ner_dic: "",
    compare_dic: "",
  };
  const [result, setResult] = useState(dummyResult);
  const [resultPending, setResultPending] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [company, setCompany] = useState([]);
  const [uploadedData, setUpLoadedData] = useState({
    company: "",
    templateUrl: "",
  });

  // whene user selects template
  const handleTemplateSelect = (url) => {
    document.getElementById("enter_company_name").showModal();
    document.getElementById("ctmodal").click();

    setUpLoadedData({ ...uploadedData, templateUrl: url });
  };

  const [otherSelected, setOtherSelected] = useState(false);

  // whene user selects company template
  const handleCompanySelect = (url) => {
    document.getElementById("ctmodal").click();

    setUpLoadedData({ ...uploadedData, templateUrl: url });
  };

  // function for other selected
  const handleSelectChange = (event) => {
    const selectedCompany = event.target.value;
    setUpLoadedData({ ...uploadedData, company: selectedCompany });
    setOtherSelected(selectedCompany === "Other");

  };

  const handleInputChange = (event) => {
    const selectedCompany = event.target.value;
    setUpLoadedData({ ...uploadedData, company: selectedCompany });
    console.log(uploadedData.company);
  };

  // to fetch result 
  const fetchResult = () => {
    setResultPending(() => true);

    setTimeout(()=> {
      setResultPending(false);
    },5000);

  }

  // to load template and companies
  const loadTemplateAndCompanies = async () => {
    // to get templates
    let url = `${process.env.REACT_APP_BACKEND_IP}/template/get`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        usertoken: localStorage.getItem("usertoken"),
      },
    });
    const data = await response.json();
    console.log(data);

    if (data.success || data.signal === "green") {
      setTemplates(data.templates);
    }

    // to get companies list
    url = `${process.env.REACT_APP_BACKEND_IP}/userHistory/getUserHistory`;
    const response2 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        usertoken: localStorage.getItem("usertoken"),
      },
    });
    const data2 = await response2.json();
    console.log(data2);

    if (data2.success || data2.signal === "green") {
      setCompany(data2.history);
    }

    try {
    } catch (error) {}
  };

  // if user not logged in
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      navigate("/login");
    } else {
      loadTemplateAndCompanies();
    }
  }, []);

  // actual returning data ---------
  return (
    <div className="w-[100%] h-[88vh] flex justify-around relative z-1 pt-5 overflow-y-clip">
      {/* sidebar */}
      <Sidebar />

      {/* chat area  */}
      <div
        style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(8px)",
        }}
        class="overflow-y-scroll rounded-lg shadow-xl border-[1px] border-gray-500 shadow-blue-500/50 h-[83vh] w-[70vw] p-2 pt-5"
      >
        {/* inital text by ai  */}
        {!result.summary ? (
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
        ) : (
          <Deviations result={result} />
        )}
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
            <button
              id="ctmodal"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Select Template to Compare with</h3>
          <ul className="menu  bg-base-200 rounded-box w-[100%] mt-2">
            <li>
              <details open>
                <summary>Master Template</summary>
                <ul>
                  {templates.map((t) => {
                    return (
                      <li onClick={() => handleTemplateSelect(t.url)}>
                        <a>{t.version}</a>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Company Template</summary>
                <ul>
                  {company.map((cmp) => {
                    return (
                      <li>
                        <details>
                          <summary>{cmp.company}</summary>
                          <ul>
                            {cmp.data.map((dt) => {
                              return (
                                <li onClick={handleCompanySelect}>
                                  <a>version-{dt.version}</a>
                                </li>
                              );
                            })}
                          </ul>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </dialog>

      {/* if user selects template then he or she needs to selece company too  */}
      <dialog id="enter_company_name" className="modal">
        <div className="modal-box flex flex-col">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Select Company Name</h3>
          <select
            className="select select-primary w-full max-w-xs mt-4"
            value={uploadedData.company}
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Company Name ?
            </option>
            {company.map((cmp) => <option value={cmp.company}> {cmp.company} </option>)}
            <option value="Other">Other</option>
          </select>
          {otherSelected === true && (
            <input
              id="cname"
              type="text"
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mt-2"
            />
          )}
          <button onClick={fetchResult} className="btn hover:bg-blue-600 bg-blue-500 shadow-blue-500 border-none shadow-lg text-white mt-4 w-[7vw]">Submit</button>
        </div>
      </dialog>
    </div>
  );
}
