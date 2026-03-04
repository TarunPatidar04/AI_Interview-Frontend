
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInterviewHistory } from "../utils/api";
import {
  FiArrowRight,
  FiPlay,
  FiClock,
  FiFileText,
  FiCpu,
  FiTrendingUp,
  FiMonitor,
  FiMic,
  FiTarget,
  FiCalendar,
  FiAward,
} from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react";

const Home = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getInterviewHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-900 overflow-hidden font-sans selection:bg-emerald-500/30">
      <Navbar />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-purple-100/50 rounded-full blur-[150px]" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-medium text-sm mb-8"
          >
            <IoSparkles />
            <span>AI-Powered Next-Gen Interview Prep</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 text-gray-900"
          >
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Tech Interview
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Get hired faster with our{" "}
            <span className="text-emerald-600 font-bold">
              AI mock interview platform
            </span>
            . Practice real interview questions tailored to your resume and
            role, and receive instant, actionable feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/interview"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg hover:bg-black"
            >
              <FiPlay className="group-hover:translate-x-1 transition-transform" />
              Start Interview
            </Link>
            <a
              href="#history"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 hover:border-gray-300 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <FiClock />
              View History
            </a>
          </motion.div>
        </section>

        {/* Previous Interviews Dashboard */}
        <section
          id="history"
          className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Your Interview History
              </h2>
              <p className="text-gray-600 text-lg">
                Track your progress and review past performances.
              </p>
            </div>
            <Link
              to="/interview"
              className="mt-4 md:mt-0 px-6 py-3 bg-emerald-100 text-emerald-700 font-semibold rounded-full hover:bg-emerald-200 transition"
            >
              + New Interview
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center">
              <FiFileText className="text-5xl text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No past interviews found
              </h3>
              <p className="text-gray-500 mb-6">
                Start your first AI mock interview to see it here.
              </p>
              <Link
                to="/interview"
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((interview) => (
                <motion.div
                  key={interview._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        interview.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {interview.status}
                    </span>
                    <span className="text-sm font-medium text-gray-400 flex items-center gap-1">
                      <FiCalendar />{" "}
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {interview.role}
                  </h3>
                  <div className="text-gray-500 text-sm mb-4 font-medium flex gap-3">
                    <span>{interview.mode}</span>
                    <span>•</span>
                    <span>{interview.experience} yrs exp</span>
                  </div>

                  {interview.status === "completed" ? (
                    <div className="mt-auto bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">
                          Final Score
                        </div>
                        <div className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                          {interview.finalScore?.toFixed(1) || 0}{" "}
                          <span className="text-sm text-gray-400 font-medium">
                            / 10
                          </span>
                        </div>
                      </div>
                      <FiAward className="text-4xl text-emerald-500 opacity-20" />
                    </div>
                  ) : (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <button
                        onClick={() => navigate("/interview")}
                        className="w-full py-2 text-center text-emerald-600 font-semibold hover:bg-emerald-50 rounded-lg transition"
                      >
                        Resume Interview
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Dynamic AI Features Section */}
        <section className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Smarter Preparation,{" "}
              <span className="text-emerald-500">Faster Hires</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI doesn't just ask questions; it listens, analyzes, and
              adapts to your responses just like a real engineering manager.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 rounded-3xl hover:border-emerald-200 transition-colors group"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors border border-gray-100">
                <FiFileText className="text-3xl text-gray-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Contextual Resume Parsing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your PDF. The{" "}
                <span className="text-emerald-600 font-medium">
                  AI extracts your projects
                </span>{" "}
                and skills, generating hyper-specific questions about the very
                technologies you claim to know.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 rounded-3xl hover:border-indigo-200 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full blur-2xl -z-10" />
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors border border-gray-100">
                <FiMic className="text-3xl text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Live Voice Interviews
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Don't just type. Activate your microphone and converse with an{" "}
                <span className="text-indigo-600 font-medium">AI avatar</span>{" "}
                that interrupts, asks follow-ups, and simulates the pressure of
                a live call.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 rounded-3xl hover:border-purple-200 transition-colors group"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-50 transition-colors border border-gray-100">
                <FiTrendingUp className="text-3xl text-gray-400 group-hover:text-purple-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Granular Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receive an immediate breakdown of your performance. See metrics
                on{" "}
                <span className="text-purple-600 font-medium">
                  technical accuracy, confidence, and filler words
                </span>
                . Know exactly what to fix.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works - Visual Step Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                The Anatomy of an <br />
                <span className="text-emerald-500">AI Mock Session</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                A seamless flow designed to mirror the top tech companies'
                hiring processes, giving you the edge before you ever step into
                the room.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: <FiFileText />,
                    title: "1. Upload & Configure",
                    desc: "Feed the AI your resume and select the target role.",
                  },
                  {
                    icon: <FiMonitor />,
                    title: "2. The Grill",
                    desc: "Face adaptive, challenging technical and behavioral questions.",
                  },
                  {
                    icon: <FiTarget />,
                    title: "3. Actionable Feedback",
                    desc: "Review your comprehensive score and AI-suggested improvements.",
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-200 text-emerald-500 text-xl shadow-sm">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Abstract visual representation instead of images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-auto md:h-[600px] w-full bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-8 overflow-hidden"
            >
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[150%] h-[150%] rounded-full border border-gray-200 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full rounded-full border border-gray-100"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[50%] h-[50%] rounded-full border border-emerald-500/20"
              />

              {/* Center icon */}
              <div className="relative z-10 w-32 h-32 bg-gray-50 border border-emerald-500/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                <FiCpu className="text-5xl text-emerald-500" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 border border-gray-200 shadow-xl"
              >
                Generating Questions...
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1/4 right-1/4 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 border border-gray-200 shadow-xl"
              >
                Analyzing Confidence: 85%
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Minimal */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 text-center border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to upgrade your tech career?
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Stop failing interviews because of nerves. Practice with AI until
              perfectly polished.
            </p>
            <Link
              to="/interview"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl"
            >
              Start Your First Interview <FiArrowRight />
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
