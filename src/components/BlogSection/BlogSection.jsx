import BlogCard from "../BlogCard/BlogCard";

function BlogSection() {
  return (
    <section className="bg-white py-20 dark:bg-[#030817]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
