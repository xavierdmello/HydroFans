import { FaAppleAlt, FaCog, FaHome, FaLeaf, FaWater } from 'react-icons/fa';
import React, { useCallback, useRef, useState } from 'react';

import WaterIntakeForm from './components/WaterIntakeForm';
import Webcam from 'react-webcam';
import logo from '/logo.png';

function App() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');

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
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          const base64Image = canvas.toDataURL('image/jpeg');
          setBase64Image(base64Image);
        }
      };
    }
  }, [webcamRef]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return null;
      case 'water':
        return <WaterIntakeForm />;
      case 'nutrition':
        return null;
      case 'environment':
        return null;
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
        <div className="mx-5 overflow-hidden rounded-lg md:max-w-[50%] max-w-[95%]">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" className="w-full" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full"
              videoConstraints={videoConstraints}
            />
          )}
        </div>
        <div className="flex-grow">{renderPage()}</div>
        <div className="w-full mt-auto flex justify-around py-4 bg-gray-200">
          <FaHome
            className={`text-2xl cursor-pointer ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setCurrentPage('home')}
          />
          <FaWater
            className={`text-2xl cursor-pointer ${currentPage === 'water' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setCurrentPage('water')}
          />
          <FaAppleAlt
            className={`text-2xl cursor-pointer ${currentPage === 'nutrition' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setCurrentPage('nutrition')}
          />
          <FaLeaf
            className={`text-2xl cursor-pointer ${currentPage === 'environment' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setCurrentPage('environment')}
          />
          <FaCog
            className={`text-2xl cursor-pointer ${currentPage === 'settings' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setCurrentPage('settings')}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
