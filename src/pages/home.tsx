import axios from "axios";
import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    const checkToken = async () => {
      const stored_token = localStorage.getItem("token");
      if (!stored_token) {
        window.location.href = "/";
      }
    };
    checkToken();
  }, []);

  const logout = async () => {
    await axios
      .get("http://localhost:3000/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };
  return (
    <div>
      <div>Home</div>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default Home;
