function SearchBar({ darkMode, searchTerm, setSearchTerm }) {
  return (
    <form
      // Thêm onSubmit để ngăn trang web bị tải lại (reload) khi người dùng nhấn phím Enter
      onSubmit={(e) => e.preventDefault()}
      className={`mx-auto mt-7 flex w-full max-w-2xl overflow-hidden rounded-md border p-1 shadow-sm transition-colors focus-within:ring-2 focus-within:ring-indigo-500/50 hover:border-indigo-400
        ${
          darkMode
            ? "border-slate-700 bg-slate-950"
            : "border-slate-300 bg-white"
        }`}
    >
      <input
        type="text"
        //Gắn giá trị của input với state searchTerm
        value={searchTerm}
        //Cập nhật state mỗi khi người dùng gõ phím
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search title..."
        className={`h-12 w-full rounded-md border-0 bg-transparent px-4 text-sm outline-none shadow-none transition-colors
          ${
            darkMode
              ? "text-slate-100 placeholder:text-slate-400"
              : "text-slate-900 placeholder:text-slate-400"
          }`}
      />

      <button
        type="submit"
        // Thêm hiệu ứng hover: bóng đổ và nảy lên một chút (hover:-translate-y-0.5 hover:shadow-md)
        className="h-12 min-w-[8rem] shrink-0 rounded-md bg-indigo-600 px-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
