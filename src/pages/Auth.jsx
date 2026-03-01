import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const Auth = () => {
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20">
      <motion.div
        className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // whileHover={{ scale: 1.02 }}
        // whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot className="" size={18} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">AI Interview</h2>
        </div>

        <h1 className="text-2xl font-semibold mb-4 md:text-3xl leading-snug text-center">
          Continue with
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2 ml-2">
            <IoSparkles size={16} /> AI Smart Interview
          </span>
        </h1>

        <p className="text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to AI Smart Interview to prepare for your next interview by
          providing you with a realistic interview experience.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full cursor-pointer bg-black text-white py-3 rounded-2xl font-semibold"
          onClick={handleGoogleAuth}
        >
          <FcGoogle className="inline-block mr-2" size={20} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
