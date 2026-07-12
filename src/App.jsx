import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  // Quản lý trạng thái Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#030817] dark:text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route
              path="/home"
              element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
            />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
