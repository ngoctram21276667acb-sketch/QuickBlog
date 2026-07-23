import React from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "@/Services/postServices";

export const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await getPosts();
        const selectedPost = posts.items.find((p) => p._id === id);
        setPost(selectedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <article className="mx-auto max-w-3xl px-5 pb-12 pt-2 sm:px-6 sm:pt-6">
        <div className="mb-4 text-center text-sm font-semibold text-indigo-600 sm:text-base">
          Published on <time>{post.createdAt || "June 4, 2026"}</time>
        </div>
        <h1 className="mx-auto mb-4 max-w-2xl text-center text-2xl font-semibold leading-snug tracking-normal text-black dark:text-white sm:text-4xl">
          {post.title || "Future of Artificial Intelligence"}
        </h1>
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12">
          <span className="inline-flex items-center rounded-full text-xs font-semibold dark:text-indigo-200 border border-indigo-200 bg-white px-4 py-1 text-indigo-600 dark:border-indigo-800 dark:bg-slate-950">
            {post.tags?.[0] || "Technology"}
          </span>
        </div>
        <img
          alt={post.title || "Future of Artificial Intelligence"}
          className="mx-auto mb-9 max-h-[26rem] max-w-full rounded-[1.25rem] object-contain sm:mb-10"
          src={
            post.image ||
            "https://res.cloudinary.com/djgduskbu/image/upload/v1780546956/hxevidqagea4krse07jl.png"
          }
        />
        <div className="prose-content mx-auto max-w-2xl text-left text-base leading-7 text-black dark:text-slate-100">
          <p>
            {/* preview content html => using dangerouslySetInnerHTML */}
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nunc nisl eget nunc. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nunc nisl eget nunc."
            )}
          </p>
        </div>
      </article>
    </div>
  );
};
