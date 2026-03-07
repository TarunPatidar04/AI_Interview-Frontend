import { motion } from "motion/react";
import { useState } from "react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import axios from "axios";
import { GoMultiSelect } from "react-icons/go";
import { API_BASE_URL } from "../config";
const Step1SetUp = ({ onStart }) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const result = await axios.post(
        `${API_BASE_URL}/interview/resume`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
    } catch (error) {
      console.log(error);
    } finally {
      setAnalyzing(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-100 to-gray-200 px-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-linear-to-br from-green-500 to-green-100 p-12 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            Start Your Interview
          </h2>
          <p className="text-black text-lg">
            Get ready to showcase your skills and impress the interviewers.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: <FaUserTie className="text-green-600 text-xl" />,
                text: "Mock Interviews",
              },
              {
                icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
                text: "Voice Analysis",
              },
              {
                icon: <FaChartLine className="text-green-600 text-xl" />,
                text: "Progress Tracking",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
                <span className="text-black text-lg">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-10 bg-white"
        >
          <h2 className="text-2xl font-bold text-black mb-1">
            Set Up Your Interview
          </h2>
          <p className="text-black text-lg">
            Get ready to showcase your skills and impress the interviewers.
          </p>

          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="relative">
              <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter experience (in years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="relative">
              {/* <GoMultiSelect className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> */}
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
              </select>
              {!analysisDone && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document.getElementById("resumeupload").click()
                  }
                  className="mt-4 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 gover:bg-green-50 transition"
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    id="resumeupload"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    className="w-full hidden pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-gray-500 font-medium">
                    {resumeFile ? resumeFile.name : "Upload Resume"}
                  </p>
                  {resumeFile && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadResume();
                      }}
                      disabled={analyzing}
                      className="mt-4 bg-gray-900 cursor-pointer text-white px-5 rounded-lg hover:bg-gray-800 transition"
                    >
                      {analyzing ? "Analyzing..." : "Analyze Resume"}
                    </motion.button>
                  )}
                </motion.div>
              )}

              {analysisDone && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 mt-5 border border-gray-200 rounded-xl p-5 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Resume Analysis Result
                  </h3>

                  {skills.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 text-sm">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md"
                          >
                            {typeof skill === "string"
                              ? skill
                              : skill.name || JSON.stringify(skill)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {projects.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 text-sm">
                        Projects
                      </h4>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {projects.map((project, index) => (
                          <li key={index} className="text-gray-600 text-sm">
                            {typeof project === "string"
                              ? project
                              : project.name ||
                                project.title ||
                                JSON.stringify(project)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!skills.length && !projects.length && (
                    <p className="text-gray-500 text-sm">
                      No specific skills or projects extracted.
                    </p>
                  )}
                </motion.div>
              )}

              <motion.button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const data = {
                      role,
                      experience,
                      mode,
                      resumeText,
                      projects,
                      skills,
                    };
                    const response = await axios.post(
                      `${API_BASE_URL}/interview/generate-questions`,
                      data,
                      {
                        withCredentials: true,
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                      },
                    );
                    onStart(response.data);
                  } catch (error) {
                    console.error("Failed to start interview:", error);
                    alert(
                      "Failed to start interview. Please check your credits or try again.",
                    );
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={!role || !experience || !resumeFile || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer bg-green-500 mt-5 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold transition shadow-md duration-300 flex justify-center items-center"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Questions...
                  </div>
                ) : (
                  "Start Interview"
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1SetUp;
