import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileEdit, Trash2 } from "lucide-react";

const MyPost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch(
          "https://quickblog-api.onrender.com/api/posts/my-posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Không thể tải danh sách bài viết");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Lỗi khi fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [navigate]);

  if (isLoading) {
    return <div className="min-h-screen bg-white"></div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Tiêu đề trang */}
      <h1 className="mb-14 flex items-center justify-center gap-3 text-5xl font-bold text-[#5B4BFF]">
        <span className="text-4xl">✍️</span> My Post
      </h1>

      <div className="overflow-x-auto pb-20">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-4 px-2 font-bold uppercase tracking-wider text-slate-900 w-2/5">
                Title
              </th>
              <th className="py-4 px-2 font-bold uppercase tracking-wider text-slate-900 w-2/5">
                Content
              </th>
              <th className="py-4 px-2 font-bold uppercase tracking-wider text-slate-900 w-1/5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr
                  key={post.id || post._id}
                  className="border-b border-slate-100/70 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-6 px-2 text-[15px] text-slate-900 font-medium align-top pr-6">
                    {post.title}
                  </td>
                  <td className="py-6 px-2 text-[15px] text-slate-700 align-top pr-6">
                    {post.content}
                  </td>
                  <td className="py-6 px-2 align-top">
                    <div className="flex items-center gap-3">
                      <button
                        className="flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-[#3b82f6] text-white transition-colors hover:bg-blue-600 shadow-sm"
                        title="Edit"
                      >
                        <FileEdit size={18} strokeWidth={2.5} />
                      </button>
                      <button
                        className="flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-[#ef4444] text-white transition-colors hover:bg-red-600 shadow-sm"
                        title="Delete"
                      >
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-12 text-center text-slate-500 text-lg"
                >
                  Bạn chưa có bài viết nào. Hãy tạo bài viết mới nhé!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyPost;
