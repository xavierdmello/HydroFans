import WaterIntakeForm from "./components/WaterIntakeForm";
import logo from "/logo.png";
import { useState } from "react";

function App() {
  return (
    <div className="min-h-screen bg-[#00afef] flex items-center justify-center py-4">
      <div className="w-4/5 max-w-[800px] mx-auto flex flex-col items-center bg-white rounded-2xl shadow-lg h-full min-h-[calc(100vh-2rem)]">
        <img src={logo} className="w-64 mt-8" alt="Hydrofans" />
        <WaterIntakeForm></WaterIntakeForm>
      </div>
    </div>
  );
}

export default App;
