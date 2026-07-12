import SearchBar from "../SearchBar/SearchBar";

function HeroSection({ darkMode, searchTerm, setSearchTerm }) {
  return (
    <section
      className={`py-24 transition-colors duration-300
      ${darkMode ? "bg-[#030817] text-white" : "bg-white text-slate-900"}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6">
        <h1 className="max-w-5xl text-center text-7xl font-extrabold leading-tight">
          Your own <span className="text-[#5B4BFF]">blogging</span>
          <br />
          platform.
        </h1>

        <p
          className={`mt-8 max-w-4xl text-center text-2xl leading-10
          ${darkMode ? "text-slate-300" : "text-slate-600"}`}
        >
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>

        <div className="mt-12 w-full max-w-2xl">
          <SearchBar
            darkMode={darkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
