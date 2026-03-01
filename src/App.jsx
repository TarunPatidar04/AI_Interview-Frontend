import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import axios from "axios";

export const API_BASE_URL = "http://localhost:3000/api";
const App = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/current-user`, {
          withCredentials: true,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
