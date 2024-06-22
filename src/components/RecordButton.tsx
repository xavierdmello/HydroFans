import React, { useState, useEffect } from "react";

interface RecordButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  onToggleRecording,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => setAnimate(true), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isRecording]);

  return (
    <button
      onClick={onToggleRecording}
      className={`w-16 h-16 rounded-full border-2 border-black flex items-center justify-center focus:outline-none transition-all duration-300 ${
        isRecording ? "bg-red-500" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      <div
        className={`${
          isRecording
            ? "w-6 h-6 rounded-sm bg-red-500"
            : "w-12 h-12 rounded-full bg-red-500"
        } ${animate ? "animate-record" : ""} transition-all duration-300`}
      ></div>
    </button>
  );
};

export default RecordButton;
