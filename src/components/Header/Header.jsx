import logo from "../../assets/logo.png";
import { FaPlus, FaRegUser } from "react-icons/fa";
import {
  Moon,
  SunMedium,
  LogOut,
  UserPlus,
  ClipboardList,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Header({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

  const handleProtectedRoute = (targetPath) => {
    setIsMenuOpen(false);
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate(targetPath);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsMenuOpen(false);
    toast.success("Logged out");
    navigate("/login");
  };

  const checkTokenAndNavigate = (targetPath) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    navigate(targetPath);
  };

  return (
    <header
      className={`shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-[#030817] text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <img
          src={logo}
          alt="QuickBlog"
          className="h-12 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <nav className="flex items-center gap-5">
          <div
            onClick={() => checkTokenAndNavigate("/create")}
            className="flex items-center gap-2 rounded-xl bg-[#5B4BFF] px-6 py-3 font-semibold text-white transition hover:bg-[#6f61ff]"
          >
            <FaPlus />
            Create Blog
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
              darkMode
                ? "bg-[#172033] text-white"
                : "border border-slate-300 bg-white text-slate-900"
            }`}
          >
            {darkMode ? <SunMedium size={22} /> : <Moon size={22} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                darkMode
                  ? "border border-slate-700 text-white hover:bg-[#172033]"
                  : "border border-slate-300 text-slate-900 hover:bg-slate-50"
              }`}
            >
              <FaRegUser />
            </button>

            {isMenuOpen && (
              <div
                className={`absolute right-0 z-50 mt-3 w-48 overflow-hidden rounded-xl border shadow-lg transition-colors ${
                  darkMode
                    ? "border-slate-700 bg-[#0a1122] text-slate-200"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleProtectedRoute("/user-management")}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                            darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"
                          }`}
                        >
                          <ClipboardList size={18} className="text-slate-500" />
                          User Management
                        </button>

                        <div
                          className={`h-px w-full ${
                            darkMode ? "bg-slate-800" : "bg-slate-100"
                          }`}
                        />
                      </>
                    )}

                    <button
                      onClick={() => handleProtectedRoute("/mypost")}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                        darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"
                      }`}
                    >
                      <ClipboardList size={18} className="text-slate-500" />
                      My Posts
                    </button>

                    <div
                      className={`h-px w-full ${
                        darkMode ? "bg-slate-800" : "bg-slate-100"
                      }`}
                    />

                    <button
                      onClick={handleLogout}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                        darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"
                      }`}
                    >
                      <LogOut size={18} className="text-slate-500" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleProtectedRoute("/register")}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                        darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"
                      }`}
                    >
                      <FileText size={18} className="text-slate-500" />
                      Sign Up
                    </button>

                    <div
                      className={`h-px w-full ${
                        darkMode ? "bg-slate-800" : "bg-slate-100"
                      }`}
                    />

                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/login");
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                        darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"
                      }`}
                    >
                      <UserPlus size={18} className="text-slate-500" />
                      Sign In
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
