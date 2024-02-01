import axios from "axios";
import Home from "./pages/home";
import Root from "./pages/root";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/home" element={<Home />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
