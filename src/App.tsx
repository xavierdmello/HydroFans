import { FaAppleAlt, FaCog, FaHome, FaLeaf, FaWater } from 'react-icons/fa';
import React, { useCallback, useRef, useState } from 'react';

import Leaderboard from './util/Leaderboard';
import RecordButton from "./components/RecordButton";
import WaterIntakeForm from './components/WaterIntakeForm';
import WaterPosts from './components/WaterPosts';
import Webcam from "react-webcam";
import logo from "/logo.png";

const mostWaterIntakeUsers = [
  {
    rank: 1,
    name: "Alice",
    metric: "100 oz",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 2,
    name: "Bob",
    metric: "90 oz",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 3,
    name: "Charlie",
    metric: "80 oz",
    profilePic: "https://via.placeholder.com/32",
  },
];

const longestStreakUsers = [
  {
    rank: 1,
    name: "Dave",
    metric: "30 days",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 2,
    name: "Eve",
    metric: "25 days",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 3,
    name: "Frank",
    metric: "20 days",
    profilePic: "https://via.placeholder.com/32",
  },
];

function App() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const toggleRecording = useCallback(() => {
    setIsRecording((prev) => !prev);
  }, []);

  const videoConstraints = {
    width: 480,
    height: 640,
    facingMode: facingMode,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          const base64Image = canvas.toDataURL("image/jpeg");
          setBase64Image(base64Image);
        }
      };
    }
  }, [webcamRef]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return null;
      case "water":
        return <WaterIntakeForm />;
      case "nutrition":
        return (
          <div>
            <Leaderboard
              title="Most Water Intake Today"
              users={mostWaterIntakeUsers}
            />
            <br />
            <Leaderboard title="Longest Streak" users={longestStreakUsers} />
          </div>
        );

      case 'environment':
        return <WaterPosts />;
      case 'settings':

        return <WaterIntakeForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#00afef] flex flex-col items-center justify-center py-4">
      <div className="md:w-4/5 w-[95%] max-w-[800px] mx-auto flex flex-col items-center bg-white rounded-2xl shadow-lg h-full min-h-[calc(100vh-2rem)]">
        <img src={logo} className="w-64 mt-8 mb-8" alt="Hydrofans" />
        {currentPage === "home" && (
          <div className="mx-5 overflow-hidden rounded-lg flex flex-col items-center md:max-w-[50%] max-w-[95%]">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full rounded-lg"
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
                videoConstraints={videoConstraints}
              />
            )}
            <br />
            <RecordButton
              isRecording={isRecording}
              onToggleRecording={toggleRecording}
            />
          </div>
        )}
        <div className="flex-grow">{renderPage()}</div>
        <div className="w-full mt-auto flex justify-around py-4 bg-gray-200">
          <FaHome
            className={`text-2xl cursor-pointer ${
              currentPage === "home" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("home")}
          />
          <FaWater
            className={`text-2xl cursor-pointer ${
              currentPage === "water" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("water")}
          />
          <FaAppleAlt
            className={`text-2xl cursor-pointer ${
              currentPage === "nutrition" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("nutrition")}
          />
          <FaLeaf
            className={`text-2xl cursor-pointer ${
              currentPage === "environment" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("environment")}
          />
          <FaCog
            className={`text-2xl cursor-pointer ${
              currentPage === "settings" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("settings")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
