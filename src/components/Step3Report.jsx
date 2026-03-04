import React from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiHome,
  FiAward,
  FiMessageSquare,
  FiTrendingUp,
} from "react-icons/fi";
import {motion} from "motion/react";

const Step3Report = ({ report }) => {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-500 font-medium">
          No Report Data Available.
        </div>
      </div>
    );
  }

  const {
    finalScore,
    overallFeedback,
    totalConfidence,
    totalCommunication,
    totalCorrectness,
    questions,
  } = report;

  const scoreColor = (score) => {
    if (score >= 8) return "text-green-500 bg-green-50";
    if (score >= 5) return "text-yellow-500 bg-yellow-50";
    return "text-red-500 bg-red-50";
  };

  const getScoreBarColor = (score) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4"
          >
            <FiAward className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Interview Completed
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Great job! Here is your comprehensive performance analysis. Use
            these insights to prepare for your next actual interview.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="col-span-1 md:col-span-4 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="shrink-0 relative flex items-center justify-center w-40 h-40">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-gray-100"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{
                    strokeDasharray: `${(finalScore / 10) * 100}, 100`,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`${getScoreBarColor(finalScore).replace("bg-", "text-")}`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">
                  {finalScore?.toFixed(1) || 0}
                </span>
                <span className="text-sm text-gray-500 font-medium">/ 10</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Overall Feedback
              </h3>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed text-lg italic">
                "{overallFeedback || "No feedback provided."}"
              </div>
            </div>
          </motion.div>

          {/* Metric Cards */}
          {[
            {
              label: "Confidence",
              score: totalConfidence,
              icon: <FiCheckCircle />,
            },
            {
              label: "Communication",
              score: totalCommunication,
              icon: <FiMessageSquare />,
            },
            {
              label: "Correctness",
              score: totalCorrectness,
              icon: <FiTrendingUp />,
            },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`md:col-span-1 p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 ${scoreColor(metric.score)}`}
            >
              <div className="text-2xl opacity-80">{metric.icon}</div>
              <div className="text-3xl font-extrabold">
                {metric.score?.toFixed(1) || 0}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider opacity-80">
                {metric.label}
              </div>
            </motion.div>
          ))}

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/")}
            className={`md:col-span-1 cursor-pointer p-6 rounded-3xl bg-gray-900 text-white shadow-xl flex flex-col items-center justify-center gap-3 hover:bg-gray-800 transition`}
          >
            <FiHome className="text-3xl" />
            <div className="text-lg font-bold">Go Home</div>
          </motion.div>
        </div>

        {/* Detailed Q&A Breakdown */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
            <FiCheckCircle className="text-green-500 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-800">
              Detailed Question Breakdown
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {questions?.map((q, i) => (
              <div
                key={i}
                className="p-6 md:p-8 space-y-4 transition hover:bg-gray-50/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <span className="text-blue-500 font-bold mr-2">
                      Q{i + 1}.
                    </span>
                    {q.question}
                  </h3>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-sm font-bold border ${scoreColor(q.score)} border-current`}
                  >
                    {q.score} / 10
                  </span>
                </div>

                <div className="pl-8 space-y-4">
                  <div>
                    <span className="text-sm font-bold text-gray-500 uppercase">
                      Your Answer
                    </span>
                    <p className="mt-1 text-gray-700 bg-gray-100 p-4 rounded-xl">
                      {q.answer || "No answer provided"}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-bold text-gray-500 uppercase">
                      Feedback
                    </span>
                    <p className="mt-1 text-gray-700 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      {q.feedback}
                    </p>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <span className="text-xs font-semibold text-gray-500 px-2 py-1 bg-gray-100 rounded-md">
                      Confidence: {q.confidence}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 px-2 py-1 bg-gray-100 rounded-md">
                      Communication: {q.communication}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 px-2 py-1 bg-gray-100 rounded-md">
                      Correctness: {q.correctness}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Step3Report;
