import logo from "../../assets/logo.png";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { Moon, SunMedium } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm transition-colors duration-300 dark:bg-[#030817]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <img src={logo} alt="QuickBlog" className="h-12" />

        <nav className="flex items-center gap-5">
          <button className="flex items-center gap-2 rounded-xl bg-[#5B4BFF] px-6 py-3 font-semibold text-white hover:bg-[#6f61ff]">
            <FaPlus />
            Create Blog
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl transition
            ${
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
              className={`flex h-12 w-12 items-center justify-center rounded-xl transition
              ${
                darkMode
                  ? "border border-slate-700 text-white hover:bg-[#172033]"
                  : "border border-slate-300 text-slate-900 hover:bg-slate-50"
              }`}
            >
              <FaRegUser />
            </button>

            {isMenuOpen && (
              <div
                className={`absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border shadow-lg z-50 transition-colors
                ${
                  darkMode
                    ? "border-slate-700 bg-[#0a1122] text-slate-200"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <a
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition
                  ${darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"}`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  My Posts
                </a>

                <div
                  className={`h-px w-full ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                ></div>

                <a
                  href="/register"
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition
                  ${darkMode ? "hover:bg-[#172033]" : "hover:bg-slate-50"}`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
