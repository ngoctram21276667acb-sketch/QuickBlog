import logo from "../../assets/logo.png";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { Moon, SunMedium } from "lucide-react";

function Header({ darkMode, setDarkMode }) {
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

          <button
            className={`flex h-12 w-12 items-center justify-center rounded-xl transition
            ${
              darkMode
                ? "border border-slate-700 text-white"
                : "border border-slate-300 text-slate-900"
            }`}
          >
            <FaRegUser />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
