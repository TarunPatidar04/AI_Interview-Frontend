import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFileUpload, FaCheckCircle, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../config";

import Footer from "../components/Footer";

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const result = await axios.post(
        `${API_BASE_URL}/interview/resume`,
        formData,
        {
          withCredentials: true,
        },
      );

      setAnalysisResult(result.data);
    } catch (err) {
      console.error("Error analyzing resume:", err);
      setError(
        err.response?.data?.message ||
          "Failed to analyze resume. Please try again.",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-green-600 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Resume AI Analyzer</h1>
            <p className="text-green-100">
              Upload your resume to get instant insights on your skills and
              experience.
            </p>
          </div>

          <div className="p-8">
            {!analysisResult && (
              <div className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
                    resumeFile
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-400 hover:bg-gray-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    !resumeFile &&
                    document.getElementById("resume-upload").click()
                  }
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    id="resume-upload"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setResumeFile(e.target.files[0]);
                        setError("");
                      }
                    }}
                  />
                  {!resumeFile ? (
                    <div className="flex flex-col items-center">
                      <FaFileUpload className="text-gray-400 text-5xl mb-4" />
                      <p className="text-gray-600 font-medium text-lg">
                        Click or drag PDF to upload
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Max file size: 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                      <p className="text-green-700 font-medium text-lg">
                        {resumeFile.name}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeFile(null);
                        }}
                        className="text-red-500 text-sm mt-2 hover:underline"
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleUploadResume}
                  disabled={!resumeFile || analyzing}
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-md text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {analyzing ? (
                    <>
                      <FaSpinner className="animate-spin mr-3 text-xl" />
                      Analyzing Resume...
                    </>
                  ) : (
                    "Analyze My Resume"
                  )}
                </button>
              </div>
            )}

            {analysisResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 border border-gray-200 rounded-2xl">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Detected Role
                    </h3>
                    <p className="text-xl font-medium text-gray-900 capitalize">
                      {analysisResult.role || "Not specified"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 border border-gray-200 rounded-2xl">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Experience Summary
                    </h3>
                    <p className="text-xl font-medium text-gray-900">
                      {analysisResult.experience || "Not specified"}
                    </p>
                  </div>
                  {analysisResult.atsScore !== undefined && (
                    <div className="bg-green-50 p-6 border border-green-200 rounded-2xl md:col-span-2 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-2">
                          ATS Score
                        </h3>
                        <p className="text-3xl font-bold text-green-900">
                          {analysisResult.atsScore} / 100
                        </p>
                      </div>
                      <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-2xl shadow-inner border-4 border-green-500">
                        {analysisResult.atsScore}%
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                    Key Skills Extracted
                  </h3>
                  {analysisResult.skills && analysisResult.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium shadow-sm"
                        >
                          {typeof skill === "string"
                            ? skill
                            : skill.name || JSON.stringify(skill)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No skills detected.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                    Identified Projects
                  </h3>
                  {analysisResult.projects &&
                  analysisResult.projects.length > 0 ? (
                    <ul className="space-y-3">
                      {analysisResult.projects.map((project, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100"
                        >
                          <span className="text-green-500 mr-3 mt-1">▹</span>
                          <span>
                            {typeof project === "string"
                              ? project
                              : project.name ||
                                project.title ||
                                JSON.stringify(project)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">
                      No projects detected.
                    </p>
                  )}
                </div>

                {analysisResult.feedback && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                      Resume Feedback
                    </h3>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl shadow-sm text-blue-900 leading-relaxed whitespace-pre-line">
                      {analysisResult.feedback}
                    </div>
                  </div>
                )}

                <div className="pt-6 text-center">
                  <button
                    onClick={() => {
                      setAnalysisResult(null);
                      setResumeFile(null);
                    }}
                    className="text-green-600 hover:text-green-800 font-medium hover:underline"
                  >
                    Analyze Another Resume
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeAnalyzer;
