import BlogCard from "../BlogCard/BlogCard";
import { useState, useEffect } from "react";

function BlogSection({ darkMode, searchTerm, posts }) {
  const allBlogs = posts || [
    {
      id: 1,
      title: "Blog Post 1",
      category: "Technology",
    },
    {
      id: 2,
      title: "Blog Post 2",
      category: "Design",
    },
  ];
  // Logic lọc
  const filteredBlogs = allBlogs.filter((blog) => {
    if (!searchTerm) return true;
    const keyword = searchTerm.toLowerCase();
    return (
      (blog.title && blog.title.toLowerCase().includes(keyword)) ||
      (blog.category && blog.category.toLowerCase().includes(keyword)) ||
      (blog.description && blog.description.toLowerCase().includes(keyword))
    );
  });

  return (
    <section className="bg-white py-20 dark:bg-[#030817]">
      <div className="mx-auto max-w-7xl px-6">
        {filteredBlogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} data={blog} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex justify-center opacity-80">
              <svg
                className={`h-32 w-32 ${darkMode ? "text-slate-600" : "text-slate-300"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l6-6m0 0l-6-6m6 6H9"
                  opacity="0.4"
                />
                <circle cx="14" cy="14" r="5" strokeWidth="1.5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.5 17.5L21 21"
                />
              </svg>
            </div>
            <h3
              className={`mb-2 text-xl font-bold tracking-wide ${darkMode ? "text-slate-200" : "text-slate-600"}`}
            >
              We could not find any blog
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Please try again with a different search query.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogSection;
