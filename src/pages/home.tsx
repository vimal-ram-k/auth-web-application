import axios from "axios";
// import { useEffect } from "react";
import { Suspense } from "react";
function Home() {
  // useEffect(() => {
  //   const checkToken = async () => {
  //     const stored_token = localStorage.getItem("token");
  //     if (!stored_token) {
  //       window.location.href = "/";
  //     }
  //   };
  //   checkToken();
  // }, []);

  const logout = async () => {
    await axios
      .get("http://localhost:8000/logout", {
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
    <Suspense fallback={<Loading />}>
      <div>
        <div>Home</div>
        <button onClick={logout}>Log out</button>
      </div>
    </Suspense>
  );
}

function Loading() {
  return <div>...Loading</div>;
}

export default Home;
