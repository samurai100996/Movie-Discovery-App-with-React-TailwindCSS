const SearchBar = ({ query, onSearch }) => {
  const categories = [
    { label: "🔥 Popular", value: "popular" },
    { label: "⭐ Top Rated", value: "top_rated" },
    { label: "🎬 Now Playing", value: "now_playing" },
    { label: "📅 Upcoming", value: "upcoming" },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onSearch("", value)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 text-amber-300
            ${query === value
              ? "bg-accent border-accent text-white"
              : "bg-card border-white/10 text-gray-400 hover:border-accent hover:text-accent"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SearchBar;