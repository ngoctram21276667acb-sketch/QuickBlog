import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BlogDetails } from "./pages/BlogDetails";
import Layout from "./components/Layout";
function App() {
  // Quản lý trạng thái Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#030817] dark:text-white">
        <BrowserRouter>
          <Routes>
            {/* sử dụng component Layout vào Home và Blog Detail */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route
              path="/home"
              element={
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Home />
                </Layout>
              }
            />

            <Route
              path="/blog/:id"
              element={
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <BlogDetails />
                </Layout>
              }
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
