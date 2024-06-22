import { useState } from "react";
import logo from "/logo.png";

function App() {
  return (
    <div className="w-4/5 max-w-[1200px] mx-auto flex flex-col items-center bg-white h-full min-h-screen">
      <img src={logo} className="w-64" alt="Hydrofans" />
    </div>
  );
}

export default App;
