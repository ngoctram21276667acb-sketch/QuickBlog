import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Undo,
  Redo,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  IndentDecrease,
  IndentIncrease,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
} from "lucide-react";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      title,
      content,
      tags,
    };

    console.log("Dữ liệu sẵn sàng gửi API:", blogData);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-white"></div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-10 flex items-center justify-center gap-4 text-4xl font-bold text-indigo-600 sm:text-6xl">
        Create Blog
      </h1>

      <form className="space-y-7" onSubmit={handleSubmit}>
        {/* BLOG IMAGE */}
        <label className="block">
          <span className="mb-3 block font-semibold text-[#111827]">
            Blog Image
          </span>
          <div>
            <input
              accept="image/*"
              className="hidden"
              type="file"
              id="blog-image-input"
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById("blog-image-input").click()
              }
              className="flex h-24 w-full items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-60"
            >
              <ImageIcon className="h-5 w-5" />
              Click to upload image
            </button>
          </div>
        </label>

        {/* BLOG TITLE */}
        <label className="block">
          <span className="mb-3 block font-semibold text-[#111827]">
            Blog Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            placeholder="Enter blog title"
          />
        </label>

        {/* BLOG CONTENT (EDITOR) */}
        <label className="block">
          <span className="mb-3 block font-semibold text-[#111827]">
            Blog Content
          </span>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col min-h-[420px]">
              {/* Menu Bar */}
              <div className="px-5 py-3 flex gap-5 text-[14px] text-slate-700 font-medium">
                <span className="cursor-pointer hover:text-black">File</span>
                <span className="cursor-pointer hover:text-black">Edit</span>
                <span className="cursor-pointer hover:text-black">View</span>
                <span className="cursor-pointer hover:text-black">Insert</span>
                <span className="cursor-pointer hover:text-black">Format</span>
                <span className="cursor-pointer hover:text-black">Tools</span>
                <span className="cursor-pointer hover:text-black">Table</span>
              </div>

              {/* Toolbar (Đã làm lại chuẩn xác Hình 1) */}
              <div className="px-5 py-2 flex flex-wrap items-center gap-7 bg-white border-b border-slate-100">
                {/* Undo / Redo */}
                <div className="flex items-center gap-4 text-slate-400">
                  <Undo
                    className="w-[18px] h-[18px] cursor-pointer hover:text-slate-700"
                    strokeWidth={2.5}
                  />
                  <Redo
                    className="w-[18px] h-[18px] cursor-pointer hover:text-slate-700"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Paragraph Dropdown */}
                <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-md cursor-pointer text-slate-700 transition-colors">
                  <span className="text-[13px] font-medium pr-5">
                    Paragraph
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {/* Bold / Italic */}
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="font-bold cursor-pointer text-[16px] hover:text-black">
                    B
                  </span>
                  <span className="italic cursor-pointer text-[16px] font-serif hover:text-black">
                    I
                  </span>
                </div>

                {/* Alignment */}
                <div className="flex items-center gap-4 text-slate-700">
                  <AlignLeft
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                  <AlignCenter
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                  <AlignRight
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                  <AlignJustify
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Lists & Indent */}
                <div className="flex items-center gap-4 text-slate-700">
                  <List
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                  <ListOrdered
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                  <IndentDecrease
                    className="w-[18px] h-[18px] cursor-pointer text-slate-300"
                    strokeWidth={2.5}
                  />
                  <IndentIncrease
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Inserts (Link, Image, Code) */}
                <div className="flex items-center gap-4 text-slate-700">
                  <LinkIcon
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                  <ImageIcon
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                  <Code
                    className="w-[18px] h-[18px] cursor-pointer hover:text-black"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full flex-1 p-5 border-none resize-none focus:outline-none text-[15px] text-slate-900 bg-white"
                style={{ minHeight: "320px" }}
              />

              {/* Status Bar */}
              <div className="bg-slate-50 border-t border-slate-100 px-4 py-1.5 flex justify-between text-xs text-slate-400">
                <span>p</span>
                <span className="flex items-center gap-1 cursor-default select-none">
                  0 words
                  <span className="text-[9px] text-slate-300 ml-1">◢</span>
                </span>
              </div>
            </div>
          </div>
        </label>

        {/* BLOG TAG */}
        <label className="block">
          <span className="mb-3 block font-semibold text-[#111827]">
            Blog Tag
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter blog tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition focus-visible:outline-none bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-11 px-5 shrink-0"
            >
              Add Tag
            </button>
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="hover:text-red-500 focus:outline-none ml-0.5 text-[10px]"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </label>

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition focus-visible:outline-none bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 h-11 rounded-md px-6 text-sm"
          >
            Create Blog
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateBlog;
