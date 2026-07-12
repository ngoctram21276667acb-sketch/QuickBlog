import { useState } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import BlogSection from "../components/BlogSection/BlogSection";
import Footer from "../components/Footer/Footer";
import { getPosts } from "@/components/Sevices/postServices";
import { useEffect } from "react";

function Home({ darkMode, setDarkMode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts.items);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  //lưu vào state searchTerm để truyền vào BlogSection
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  //lưu vào local storage để lưu chế độ darkMode
  localStorage.setItem("darkMode", darkMode);
  return (
    <>
      <HeroSection
        darkMode={darkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* kiểm tra có posts thì hiển thị BlogSection */}
      {posts.length > 0 && (
        <BlogSection
          darkMode={darkMode}
          searchTerm={searchTerm}
          posts={posts}
        />
      )}
    </>
  );
}

export default Home;
