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

function Header({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = !!localStorage.getItem("token");

  const handleProtectedRoute = (targetPath) => {
    setIsMenuOpen(false);
    const currentToken = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(targetPath);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsMenuOpen(false);
    toast.success("Logged out");
    navigate("/login");
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
          <button
            onClick={() => handleProtectedRoute("/create-blog")}
            className="flex items-center gap-2 rounded-xl bg-[#5B4BFF] px-6 py-3 font-semibold text-white hover:bg-[#6f61ff] transition"
          >
            <FaPlus />
            Create Blog
          </button>

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
                className={`absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border shadow-lg z-50 transition-colors ${
                  darkMode
                    ? "border-slate-700 bg-[#0a1122] text-slate-200"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => handleProtectedRoute("/mypost")}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition text-left ${
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
                    ></div>

                    <button
                      onClick={handleLogout}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition text-left ${
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
                      onClick={() => handleProtectedRoute("/mypost")}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition text-left ${
                        darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"
                      }`}
                    >
                      <FileText size={18} className="text-slate-500" />
                      My Posts
                    </button>

                    <div
                      className={`h-px w-full ${
                        darkMode ? "bg-slate-800" : "bg-slate-100"
                      }`}
                    ></div>

                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/login");
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition text-left ${
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
