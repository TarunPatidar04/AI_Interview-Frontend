import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";


import {
  FaMicrophone,
  FaStopCircle,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { submitAnswer, finishInterview } from "../utils/api";
const Step2Interview = ({ interviewData, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const recognitionRef = useRef(null);

  const interviewId = interviewData?.interviewId;
  const questions = interviewData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Initialize Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setAnswerText((prev) =>
            prev ? prev + " " + finalTranscript : finalTranscript,
          );
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        // Auto restart if still recording
        if (isRecording) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error(e);
          }
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
      setAnswerText("");
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }
    }
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitting) {
      handleNextQuestion("Time limit exceeded");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isSubmitting]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setAnswerText(""); // Optional: clear previous text when starting new recording
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNextQuestion = async (forcedAnswer = null) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    try {
      const finalAnswer = forcedAnswer !== null ? forcedAnswer : answerText;
      const timeTaken = (currentQuestion.timeLimit || 60) - timeLeft;

      await submitAnswer({
        interviewId,
        questionId: currentQuestion._id,
        answer: finalAnswer,
        questionIndex: currentQuestionIndex,
        timeTaken,
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleEndInterview();
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
      alert("Error submitting answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndInterview = async () => {
    setIsFinishing(true);
    try {
      if (isRecording) {
        recognitionRef.current?.stop();
        setIsRecording(false);
      }
      const report = await finishInterview(interviewId);
      onFinish(report.interview);
    } catch (error) {
      console.error("Failed to finish interview:", error);
      alert("Failed to finish interview.");
    } finally {
      setIsFinishing(false);
    }
  };

  if (!currentQuestion) return <div>Loading questions...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-6 flex flex-col items-center"
    >
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-green-500 p-6 flex justify-between items-center text-white">
          <div>
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="ml-3 text-sm opacity-90 capitalize">
              {currentQuestion.difficulty} Difficulty
            </span>
          </div>
          <motion.div
            key={timeLeft}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`font-mono text-xl font-bold bg-white/20 px-4 py-1 rounded-lg ${
              timeLeft <= 10 ? "text-red-200 animate-pulse" : ""
            }`}
          >
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </motion.div>
        </div>

        {/* Content Body */}
        <div className="p-8 flex-1 flex flex-col gap-6 overflow-y-auto">
          {/* Question Display */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Input Area */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Your Answer
              </label>
              <button
                onClick={toggleRecording}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition cursor-pointer shadow-sm ${
                  isRecording
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                {isRecording ? (
                  <>
                    <FaStopCircle className="animate-pulse" /> Stop Recording
                  </>
                ) : (
                  <>
                    <FaMicrophone /> Speak Answer
                  </>
                )}
              </button>
            </div>

            <textarea
              className="w-full flex-1 min-h-[150px] p-5 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none resize-none text-gray-700 text-lg leading-relaxed transition shadow-inner"
              placeholder={
                isRecording
                  ? "Listening... Please speak."
                  : "Type your answer here or click 'Speak Answer' to use voice..."
              }
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center gap-4">
          <button
            onClick={handleEndInterview}
            disabled={isFinishing || isSubmitting}
            className="px-6 py-3 font-semibold text-red-500 hover:bg-red-50 rounded-xl transition disabled:opacity-50 cursor-pointer"
          >
            {isFinishing ? "Finishing..." : "End Interview Early"}
          </button>

          <button
            onClick={() => handleNextQuestion()}
            disabled={isSubmitting || !answerText.trim()}
            className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Submitting...</span>
            ) : currentQuestionIndex === questions.length - 1 ? (
              <>
                Submit & Finish <FaCheckCircle />
              </>
            ) : (
              <>
                Next Question <FaPaperPlane />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Step2Interview;
