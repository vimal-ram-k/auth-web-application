import axios from "axios";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function Root() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [signupform, setsignupForm] = useState({
    username: "",
    password: "",
  });

  function signupInputHandler(event: React.FocusEvent<HTMLInputElement>) {
    console.log("singup form");
    const { name, value } = event.target;
    setsignupForm((prevsignupform) => ({
      ...prevsignupform,
      [name]: value,
    }));
  }

  function inputHandler(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const stored_token = localStorage.getItem("token");
  //     if (stored_token) {
  //       try {
  //         console.log("Effect is running");
  //         await axios
  //           .get("http://localhost:8000/login", {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //           })
  //           .then((res) => {
  //             if (res.data.token) {
  //               return (window.location.href = "/home");
  //             } else {
  //               return console.log("login again");
  //             }
  //           });
  //       } catch (err) {
  //         return console.log(err);
  //       }
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);

  return (
    <div>
      <header>Sign in</header>
      <div>
        <form
          action=""
          onSubmit={async (event) => {
            event.preventDefault();
            console.log(formData);
            await axios
              .post("http://localhost:8000/signin", formData, {})
              .then((res) => {
                console.log(res.data.token);
                console.log(res.data.user);
                localStorage.setItem("token", res.data.token);
                if (res.data.token) {
                  window.location.href = "/home";
                }
              });
          }}
        >
          <input
            className=" rounded-2 px-2"
            type="text"
            value={formData.username}
            name="username"
            id=""
            onChange={inputHandler}
            placeholder="Phone number, username or email address"
            style={{
              height: "40px",
              border: "0.5px solid gray",
              fontSize: "0.8rem",
            }}
          />
          <input
            className=" rounded-2 px-2"
            type="text"
            value={formData.password}
            name="password"
            id=""
            onChange={inputHandler}
            placeholder="Password"
            style={{
              height: "40px",
              border: "0.5px solid gray",
              fontSize: "0.8rem",
            }}
          />
          <button type="submit">Log in</button>
        </form>
      </div>

      <div>
        <h1>Sign up</h1>
        <form
          action=""
          onSubmit={async (event) => {
            event.preventDefault();
            console.log(formData);
            await axios
              .post("http://localhost:8000/signup", signupform, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                console.log(res.data.token);
                console.log(res.data.user);
                localStorage.setItem("token", res.data.token);
                console.log(res);
                if (res.data.token) {
                  window.location.href = "/home";
                }
              });
          }}
        >
          <input
            className=" rounded-2 px-2"
            type="text"
            value={signupform.username}
            name="username"
            id=""
            onChange={signupInputHandler}
            placeholder="Phone number, username or email address"
            style={{
              height: "40px",
              border: "0.5px solid gray",
              fontSize: "0.8rem",
            }}
          />
          <input
            className=" rounded-2 px-2"
            type="text"
            value={signupform.password}
            name="password"
            id=""
            onChange={signupInputHandler}
            placeholder="Password"
            style={{
              height: "40px",
              border: "0.5px solid gray",
              fontSize: "0.8rem",
            }}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
