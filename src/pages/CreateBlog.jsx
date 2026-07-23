import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
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
import { toast } from "react-hot-toast";
import { createPost } from "../Services/postServices.js";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

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

  const uploadImageToCloudinary = async (file) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      toast.error(
        "Thiếu cấu hình Cloudinary. Vui lòng thiết lập VITE_CLOUDINARY_CLOUD_NAME và VITE_CLOUDINARY_UPLOAD_PRESET.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setImageUploading(true);
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Upload Cloudinary thất bại.");
      }

      setImageUrl(data.secure_url);
      toast.success("Ảnh đã được upload lên Cloudinary.");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Không thể upload ảnh. Vui lòng thử lại.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    await uploadImageToCloudinary(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề blog.");
      return;
    }

    if (!imageUrl) {
      toast.error("Vui lòng upload ảnh blog trước khi tạo.");
      return;
    }

    const token = localStorage.getItem("token");
    const blogData = {
      title,
      content,
      tags,
      image: imageUrl,
    };

    try {
      await createPost(blogData, token);
      toast.success("Tạo blog thành công.");
      navigate("/home");
    } catch (error) {
      toast.error("Có lỗi khi tạo blog. Vui lòng thử lại.");
      console.error("Create blog error:", error);
    }
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
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById("blog-image-input").click()
              }
              disabled={imageUploading}
              className="flex h-24 w-full items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-60"
            >
              <ImageIcon className="h-5 w-5" />
              {imageUploading ? "Uploading image..." : "Click to upload image"}
            </button>
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            {imageUrl ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                <p className="mb-2 font-medium text-slate-700">
                  Ảnh đã upload:
                </p>
                <img
                  src={imageUrl}
                  alt="Uploaded blog preview"
                  className="h-40 w-full rounded-md object-cover"
                />
              </div>
            ) : (
              <p className="text-slate-500">
                Chọn ảnh để upload lên Cloudinary trước khi tạo blog.
              </p>
            )}
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
            <Editor
              apiKey="ljg8mraaidq9btpn94yn3gsktq73z3fnru24rv5hr8dk79bs"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 420,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Inter,Arial,sans-serif; font-size:14px; color:#0f172a; }",
              }}
            />
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
