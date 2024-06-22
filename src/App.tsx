import WaterIntakeForm from "./components/WaterIntakeForm";
import { useState, useRef, useCallback } from "react";
import logo from "/logo.png";
import Webcam from "react-webcam";
import RecordButton from "./components/RecordButton";

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

  return (
    <div className="min-h-screen bg-[#00afef] flex items-center justify-center py-4">
      <div className="md:w-4/5 w-[95%] max-w-[800px] mx-auto flex flex-col items-center bg-white rounded-2xl shadow-lg h-full min-h-[calc(100vh-2rem)]">
        <img src={logo} className="w-64 mt-8 mb-8" alt="Hydrofans" />
        <div className="mx-5 overflow-hidden flex flex-col items-center rounded-lg md:max-w-[50%] max-w-[95%]">
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
          <br/>
          <RecordButton
            isRecording={isRecording}
            onToggleRecording={toggleRecording}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
