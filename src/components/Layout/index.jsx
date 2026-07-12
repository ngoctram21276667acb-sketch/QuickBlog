import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ darkMode, setDarkMode, children }) {
  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-[#030817] text-white" : "bg-white text-slate-900"} transition-colors duration-300`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
export default Layout;
