import { Link } from "react-router-dom";
function BlogCard({ data }) {
  return (
    <Link to={`/blog/${data._id}`}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
        {/* Image */}
        <img
          src={
            data.image ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
          }
          alt="Blog"
          className="h-56 w-full object-cover"
        />

        <div className="p-6">
          {/* Category */}
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
            {data.tags || "Technology"}
          </span>

          {/* Title */}
          <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
            {data.title || "Future of Artificial Intelligence"}
          </h3>

          {/* Mô tả */}
          <p className="mt-3 line-clamp-3 text-slate-600 dark:text-slate-300">
            {/* preview content html => using dangerouslySetInnerHTML */}
            {data.content ? (
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            ) : (
              "Discover how AI is transforming industries, improving productivity," +
              " and creating new opportunities around the world."
            )}
          </p>

          {/* Author */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-semibold dark:text-white">
                {data.author.username || "John Doe"}
              </p>

              <p className="text-sm text-slate-500">
                {data.createdAt || "Jul 11, 2026"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
