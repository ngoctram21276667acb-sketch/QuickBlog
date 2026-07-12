import { useState } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import BlogSection from "../components/BlogSection/BlogSection";
import Footer from "../components/Footer/Footer";

function Home({ darkMode, setDarkMode }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <HeroSection
        darkMode={darkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <BlogSection darkMode={darkMode} searchTerm={searchTerm} />

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Home;
