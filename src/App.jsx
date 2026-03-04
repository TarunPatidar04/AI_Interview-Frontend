import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewPage from "./pages/InterviewPage";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

import { API_BASE_URL } from "./config";
import Navbar from "./components/Navbar";
import Pricing from "./pages/Pricing";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/current-user`, {
          withCredentials: true,
          validateStatus: (status) => status < 500, // Handle 401 without throwing error
        });
        if (res.status === 200) {
          dispatch(setUserData(res.data));
        } else {
          dispatch(setUserData(null));
        }
      } catch (error) {
        console.log("Error checking user:", error);
        dispatch(setUserData(null));
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </>
  );
};

export default App;
