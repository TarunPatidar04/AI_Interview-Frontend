import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiLogOut } from "react-icons/fi";
import { FaViacoin } from "react-icons/fa";
import { GrRobot } from "react-icons/gr";
import { IoSparkles } from "react-icons/io5";
import {
  GiCoinsPile,
  GiHeavyThornyTriskelion,
  GiArtificialIntelligence,
  GiBrain,
  GiLightThornyTriskelion,
} from "react-icons/gi";
import { LuTrainFrontTunnel } from "react-icons/lu";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { API_BASE_URL } from "../App";
import AuthModel from "./AuthModel";

const LOGO_ICONS = [
  LuTrainFrontTunnel,
  GiHeavyThornyTriskelion,
  GiArtificialIntelligence,
  GiBrain,
  GiLightThornyTriskelion,
];

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [logoIconIndex, setLogoIconIndex] = useState(0);
  const profileRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
      setProfileDropdownOpen(false);
      setMobileMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    const iconInterval = setInterval(() => {
      setLogoIconIndex((prev) => (prev + 1) % LOGO_ICONS.length);
    }, 5000);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(iconInterval);
    };
  }, []);

  const CurrentLogoIcon = LOGO_ICONS[logoIconIndex];

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-4 left-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 ease-in-out rounded-2xl ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-3 border border-gray-100/50"
            : "bg-white/50 backdrop-blur-sm shadow-[0_4px_20px_rgb(0,0,0,0.05)] py-4 border border-gray-100/30"
        }`}
      >
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-2 group outline-none cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 text-white shadow-lg shadow-gray-900/20 group-hover:shadow-gray-900/40 transition-all duration-300 group-hover:-translate-y-0.5 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={logoIconIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CurrentLogoIcon className="text-xl" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-700 tracking-tight">
                AI Interview
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6"></div>
              <div className="h-6 w-px bg-gray-200"></div> {/* Divider */}
              {/* User / Auth Section */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative group/credits hidden sm:flex h-full items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 font-medium text-sm shadow-sm transition-all hover:bg-gray-200 hover:shadow-md cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {userData ? (
                          <FaViacoin className="text-gray-900 text-lg hover:scale-110 transition-transform" />
                        ) : (
                          <GiCoinsPile className="text-gray-900 text-lg hover:scale-110 transition-transform" />
                        )}
                      </motion.div>
                      <span>{userData ? userData.credits : 0} Credits</span>
                    </motion.div>

                    {/* Desktop Credits Dropdown (Premium UI) */}
                    <AnimatePresence>
                      <div className="absolute right-0 top-[110%] w-64 opacity-0 invisible group-hover/credits:opacity-100 group-hover/credits:visible transition-all duration-200 ease-in-out z-50 pt-2">
                        <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden relative">
                          {/* Decorative header */}
                          <div className="h-10 w-full bg-linear-to-r from-emerald-500/10 to-transparent absolute top-0" />

                          <div className="p-5 relative z-10 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3 border border-emerald-100/50 shadow-sm">
                              <IoSparkles className="text-xl" />
                            </div>
                            <h4 className="text-gray-900 font-bold mb-1">
                              Unlock More Sessions
                            </h4>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                              Run out of credits? Upgrade your plan to get
                              unlimited AI interviews and advanced feedback.
                            </p>
                            <Link
                              to="/pricing"
                              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm hover:bg-black hover:shadow-md transition-all font-semibold active:scale-[0.98]"
                            >
                              Upgrade Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </AnimatePresence>
                  </div>

                  {userData ? (
                    <>
                      <div className="relative" ref={profileRef}>
                        <div
                          onClick={() =>
                            setProfileDropdownOpen(!profileDropdownOpen)
                          }
                          className="flex items-center gap-2 cursor-pointer group hover:opacity-90 transition-opacity"
                        >
                          <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700 text-white font-semibold transition-colors shadow-sm">
                            {userData?.name?.charAt(0)?.toUpperCase()}
                          </div>
                        </div>

                        {/* Desktop Profile Dropdown */}
                        <AnimatePresence>
                          {profileDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-0 mt-3 w-48 bg-gray-900 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] border border-gray-800 py-1 z-50 overflow-hidden"
                            >
                              <div className="px-4 py-3 border-b border-gray-800">
                                <p className="text-[14px] font-semibold text-white truncate">
                                  {userData?.name}
                                </p>
                                <p className="text-[13px] text-gray-400 truncate">
                                  {userData?.email}
                                </p>
                              </div>
                              <button
                                onClick={handleLogout}
                                className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-[14px] text-gray-300 hover:text-white hover:bg-gray-800 transition-colors font-medium text-left"
                              >
                                <FiLogOut className="text-[16px]" />
                                Log out
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-white font-bold shadow-sm hover:bg-black transition-colors focus:outline-none cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <GrRobot className="text-xl text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <FiX className="text-2xl" />
                ) : (
                  <FiMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-[80px] left-0 right-0 w-full bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl z-40 md:hidden overflow-hidden origin-top"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 overflow-y-auto max-h-[calc(100vh-70px)]">
              <div className="px-4 py-2 hidden">Navigation links disabled</div>

              <div className="my-4 border-t border-gray-100 pt-4">
                <div className="flex flex-col gap-2">
                  {/* Mobile Credits */}
                  <div className="flex flex-col gap-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 text-gray-800 font-medium mx-2"
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {userData ? (
                            <FaViacoin className="text-gray-900 text-xl" />
                          ) : (
                            <GiCoinsPile className="text-gray-900 text-xl" />
                          )}
                        </motion.div>
                        <span>
                          {userData ? userData.credits : 0} Available Credits
                        </span>
                      </div>
                      <Link
                        to="/pricing"
                        className="text-gray-800 text-sm hover:text-white bg-gray-200 hover:bg-gray-900 px-3 py-1.5 border border-gray-300 hover:border-gray-800 rounded-full font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Add More
                      </Link>
                    </motion.div>
                  </div>

                  {userData ? (
                    <>
                      {/* Mobile Profile Display */}
                      <div className="bg-gray-900 rounded-2xl mx-2 pt-2 pb-1">
                        <div className="flex items-center gap-3 px-4 py-2">
                          <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white font-bold shadow-sm">
                            {userData?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-base font-medium text-white truncate">
                              {userData?.name}
                            </p>
                            <p className="text-sm text-gray-400 truncate max-w-[200px]">
                              {userData?.email || "User Account"}
                            </p>
                          </div>
                        </div>

                        {/* Mobile Logout Button */}
                        <div className="px-2 mt-1 mb-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-[15px] text-gray-300 hover:text-white hover:bg-gray-800 font-medium rounded-xl transition-colors border border-transparent"
                          >
                            <FiLogOut className="text-lg" />
                            Log out
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3 px-4 mt-2">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setIsAuthModalOpen(true);
                        }}
                        className="w-12 h-12 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-white font-bold shadow-sm hover:bg-black transition-colors mx-auto cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <GrRobot className="text-2xl text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal overlay wrapper */}
      {isAuthModalOpen && (
        <AuthModel onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
