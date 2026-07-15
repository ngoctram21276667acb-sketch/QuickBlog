import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
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
      <h1 className="text-3xl font-bold">Create Blog</h1>
      <form>
        <input className="border p-2 w-full mb-3" placeholder="Title" />

        <textarea className="border p-2 w-full h-40" placeholder="Content" />

        <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateBlog;
