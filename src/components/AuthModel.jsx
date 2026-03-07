import { AnimatePresence, motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { FcGoogle } from "react-icons/fc";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FiX } from "react-icons/fi";

const AuthModel = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(
        `${API_BASE_URL}/auth/google`,
        {
          name: name,
          email: email,
        },
        { withCredentials: true },
      );
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      dispatch(setUserData(result.data.user || result.data));
      onClose();
    } catch (error) {
      dispatch(setUserData(null));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>

          <div className="flex items-center justify-center gap-3 mb-6 mt-2">
            <div className="bg-black text-white p-2 rounded-lg">
              <BsRobot size={18} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">AI Interview</h2>
          </div>

          <h1 className="text-2xl font-semibold mb-4 md:text-3xl leading-snug text-center">
            Continue with
            <br />
            <span className="bg-green-100 text-green-600 px-3 py-1 mt-2 rounded-full inline-flex items-center gap-2">
              <IoSparkles size={16} /> AI Smart Interview
            </span>
          </h1>

          <p className="text-gray-500 text-center text-sm leading-relaxed mb-8">
            Sign in to AI Smart Interview to prepare for your next interview by
            providing you with a realistic interview experience.
          </p>

          <button
            className="w-full cursor-pointer bg-black text-white py-3 rounded-2xl font-semibold flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            onClick={handleGoogleAuth}
          >
            <FcGoogle className="mr-3" size={22} />
            Continue with Google
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModel;
