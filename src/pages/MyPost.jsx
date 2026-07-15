import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyPost = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">My Post</h1>
    </div>
  );
};
export default MyPost;
