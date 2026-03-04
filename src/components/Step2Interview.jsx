import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

import {
  FaMicrophone,
  FaStopCircle,
  FaPaperPlane,
  FaCheckCircle,
  FaVolumeUp,
  FaPlay,
} from "react-icons/fa";
import { submitAnswer, finishInterview } from "../utils/api";
import femaleAiVideo from "../assets/Videos/female-ai.mp4";
import maleAiVideo from "../assets/Videos/male-ai.mp4";
const Step2Interview = ({ interviewData, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const [feedbackData, setFeedbackData] = useState(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);

  const recognitionRef = useRef(null);
  const isRecordingRef = useRef(isRecording);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  const interviewId = interviewData?.interviewId;
  const questions = interviewData?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Initialize Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
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

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          alert(
            "Microphone access denied. Please allow microphone access in your browser settings or ensure you are on a secure context (localhost or HTTPS).",
          );
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        // Auto restart if still recording
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            console.error("Failed to restart recognition:", e);
            setIsRecording(false);
          }
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Handle speaking text using TTS
  const speakText = (text, onEndCallback = null) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsPlayingVideo(true);
      utterance.onend = () => {
        setIsPlayingVideo(false);
        if (onEndCallback) onEndCallback();
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (currentQuestion && !feedbackData) {
      setTimeLeft(currentQuestion.timeLimit || 60);
      setAnswerText("");
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }
      // Speak the new question
      speakText(currentQuestion.question);
    }

    // Stop speaking when unmounting or changing questions abruptly
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentQuestionIndex, currentQuestion, feedbackData]);

  useEffect(() => {
    if (timeLeft > 0 && !feedbackData) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitting && !feedbackData) {
      handleSubmitAnswer("Time limit exceeded");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isSubmitting, feedbackData]);

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

  const handleSubmitAnswer = async (forcedAnswer = null) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    try {
      const finalAnswer = forcedAnswer !== null ? forcedAnswer : answerText;
      const timeTaken = (currentQuestion.timeLimit || 60) - timeLeft;

      const response = await submitAnswer({
        interviewId,
        questionId: currentQuestion._id,
        answer: finalAnswer,
        questionIndex: currentQuestionIndex,
        timeTaken,
      });

      // Show feedback instead of immediately moving to the next question
      setFeedbackData({
        score: response.score,
        feedback: response.feedback,
      });

      // Speak the feedback
      const feedbackSpeech = `Your score is ${response.score} out of 10. ${response.feedback}`;
      speakText(feedbackSpeech);
    } catch (error) {
      console.error("Failed to submit answer:", error);
      alert("Error submitting answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveToNextQuestion = () => {
    window.speechSynthesis.cancel(); // Stop playing feedback if still playing
    setFeedbackData(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleEndInterview();
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
          {/* Question Display & Video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-black rounded-2xl overflow-hidden shadow-inner h-[200px] relative flex items-center justify-center">
              <video
                ref={videoRef}
                src={interviewData?.mode === "HR" ? femaleAiVideo : maleAiVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted // Always muted because we use TTS for audio
                playsInline
                style={{ opacity: isPlayingVideo ? 1 : 0.7 }}
              />
              {!isPlayingVideo && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                    AI is listening
                  </span>
                </div>
              )}
            </div>
            <div className="md:col-span-2 bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-inner flex flex-col justify-center relative">
              <button
                onClick={() => speakText(currentQuestion.question)}
                className="absolute top-4 right-4 text-gray-400 hover:text-green-500 transition-colors cursor-pointer"
                title="Repeat Question"
              >
                <FaVolumeUp size={20} />
              </button>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-snug pr-8">
                {currentQuestion.question}
              </h2>
            </div>
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
              className="w-full flex-1 min-h-[150px] p-5 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none resize-none text-gray-700 text-lg leading-relaxed transition shadow-inner disabled:opacity-75 disabled:bg-gray-50"
              placeholder={
                isRecording
                  ? "Listening... Please speak."
                  : "Type your answer here or click 'Speak Answer' to use voice..."
              }
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              disabled={feedbackData !== null}
            ></textarea>

            {/* Feedback Display */}
            {feedbackData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl shadow-sm mt-2"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-blue-800">AI Feedback</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        speakText(
                          `Your score is ${feedbackData.score} out of 10. ${feedbackData.feedback}`,
                        )
                      }
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      title="Read Feedback"
                    >
                      <FaVolumeUp />
                    </button>
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-sm ${
                        feedbackData.score >= 8
                          ? "bg-green-200 text-green-800"
                          : feedbackData.score >= 5
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                      }`}
                    >
                      Score: {feedbackData.score}/10
                    </span>
                  </div>
                </div>
                <p className="text-blue-900 leading-relaxed text-lg">
                  {feedbackData.feedback}
                </p>
              </motion.div>
            )}
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

          {!feedbackData ? (
            <button
              onClick={() => handleSubmitAnswer()}
              disabled={isSubmitting || !answerText.trim()}
              className="flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Submitting...</span>
              ) : (
                <>
                  Submit Answer <FaPaperPlane />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={moveToNextQuestion}
              className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
            >
              {currentQuestionIndex === questions.length - 1 ? (
                <>
                  Finish Interview <FaCheckCircle />
                </>
              ) : (
                <>
                  Next Question <FaPlay />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Step2Interview;
