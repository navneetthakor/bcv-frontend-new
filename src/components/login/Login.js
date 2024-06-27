import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserLogedContext } from "../../context/UserLogedContext";

export default function Login() {

    // to chanck whether user login state changes or not
  const { isUserLoged, setIsUserLoged } = useContext(UserLogedContext);
    // for navigation 
    const navigate = useNavigate();


  // schema for formik form
  const userFormSchema = yup.object().shape({
    image: yup.mixed(),
    username: yup.string(),
    email: yup.string().email().required("enter valid email"),
    password: yup.string().min(4).max(16).required("password required"),
    contact_num: yup.string(),
  });

  // formik form
  const [selectedImage, setSelectedImage] = useState();
  const [loginSignupState, setLoginSignupState] = useState("signup");

  // to handle form submit
  const handleFormSubmit = async (values) => {
    let url = `${process.env.REACT_APP_BACKEND_IP}/user/`;
    url += loginSignupState === "signup" ? `createuser` : `userlogin`;
    let data;
    let response;

    if (loginSignupState === "signup") {
      const formdata = new FormData();
      if (selectedImage) formdata.append("image", selectedImage);
      for (let [key, value] of Object.entries(values)) {
        formdata.append(key, value);
      }

      response = await fetch(url, {
        method: "POST",
        body: formdata,
      });
      console.log(response);
      data = await response.json();
      console.log(data);
    } else {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      data = await response.json();
      // console.log(data);
    }

    if (data.signal === "red") alert(data.error);
    else {
        console.log(data.usertoken);
      localStorage.setItem("usertoken", data.usertoken);
      setIsUserLoged(true);
      navigate('/result');
    }
  };


  
  // to toggle login and signup
  const handleLoginSignupToggle = () => {
    if (loginSignupState === "signup") setLoginSignupState("login");
    else setLoginSignupState("signup");
  };

  const formik = (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        contact_num: "",
      }}
      validationSchema={userFormSchema}
      onSubmit={(values) => {
        handleFormSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: 'flex', flexDirection: "column", gap: "10px", height: "65vh", width: '100%'}}
          >
            <button
              style={{
                color: "skyblue",
                ":hover": { textDecoration: "underline" },
              }}
              onClick={handleLoginSignupToggle}
            >
              Click here to{" "}
              {loginSignupState === "signup" ? "Login" : "Sign-Up"}
            </button>
            {loginSignupState === "signup" && (
              <div
                style={{
                  width: 110,
                  height: 110,
                  cursor: "pointer",
                }}
                className=""
                onClick={() => document.getElementById("image").click()}
              >
                {selectedImage && (
                  <div
                    style={{width: '100px', height: '100px'}}
                    src={URL.createObjectURL(selectedImage)}
                    alt="uploaded img"
                  />
                )}
              </div>
            )}

            {/* hidden input used by image avtar  */}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />

            {loginSignupState === "signup" && (
              <div width={'100%'}>
                <textarea
                  sx={{ width: '100%' }}
                  variant="standard"
                  label="userName"
                  type="txt"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {values.username === "" && touched.username && (
                  <div>username required </div>
                )}
              </div>
            )}

            <div width={'100%'}>
              <textarea
                sx={{ width: '100%' }}
                variant="standard"
                label="email"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div>{errors.email} </div>
              )}
            </div>
            {loginSignupState === "signup" && (
              <div width={'100%'}>
                <textarea
                  sx={{ width: '100%' }}
                  variant="standard"
                  label="Contact Number"
                  type="txt"
                  name="contact_num"
                  id="contact_num"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact_num}
                />
                {errors.contact_num && touched.contact_num && (
                  <div>{errors.contact_num} </div>
                )}
              </div>
            )}
            <div width={'100%'}>
              <textarea
                sx={{ width: '100%' }}
                variant="standard"
                label="Password"
                type="txt"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.contact_num && touched.contact_num && (
                <div>{errors.contact_num} </div>
              )}
            </div>
            <button
              sx={{
                background: 'linear-gradient(to right, #805af5, #cd99ff)',
                marginTop: '5vh',
                width: '40%'
            }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              <div variant="h5" sx={{fontWeight: '700', color: 'white'}} > Submit</div>
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
  
  // to check weather user already logged or not 
  useEffect(()=>{
    if(localStorage.getItem('usertoken')) navigate('/result');  
  },[])

   return (
  <div
  style={{
    position: 'relative',
    zIndex: '100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'8vh',
  }}
  >
    <div
    sx={{
        width: '30%',
    }}
    >
        {formik}
    </div>
  </div>
  );
}
