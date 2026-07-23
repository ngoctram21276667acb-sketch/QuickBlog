import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BlogDetails } from "./pages/BlogDetails";
import MyPost from "./pages/MyPost";
import CreateBlog from "./pages/CreateBlog";
import UserManagement from "./pages/UserManagement";
import Layout from "./components/Layout";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-[#030817] text-white" : "bg-white text-slate-900"
        }`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route
            path="/home"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Home darkMode={darkMode} setDarkMode={setDarkMode} />
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

          <Route
            path="/create-blog"
            element={
              isLoggedIn ? (
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <CreateBlog />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/create-blog" element={<CreateBlog />} />

          <Route
            path="/mypost"
            element={
              isLoggedIn ? (
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <MyPost />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* sử dụng AdminRoute cho các trang yêu cầu quyền admin */}
          <Route element={<AdminRoute />}>
            <Route
              path="/user-management"
              element={
                <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <UserManagement />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
