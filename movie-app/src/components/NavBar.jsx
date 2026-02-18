import { useState } from "react";
import { FaFilm, FaSearch, FaTimes } from "react-icons/fa";

const Navbar = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    setIsSearchOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaFilm className="text-accent text-2xl" />
          <span className="text-xl font-bold tracking-tight text-amber-900">
            Cine<span className="text-accent">Verse</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className=" md:flex items-center gap-8 text-sm font-medium text-gray-900">
          {["Popular", "Top Rated", "Upcoming", "Now Playing"].map((item) => (
            <button
              key={item}
              onClick={() => onSearch("", item.toLowerCase().replace(" ", "_"))}
              className="hover:text-accent transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                autoFocus
                className="bg-card border border-white/20 rounded-l-full px-4 py-2 text-sm 
                           text-white placeholder-gray-500 outline-none focus:border-accent
                           transition-all w-48 md:w-64"
              />
              <button
                type="submit"
                className="bg-accent px-4 py-2 rounded-r-full text-sm hover:bg-accent/80 transition-colors"
              >
                <FaSearch />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="ml-2 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="bg-card border border-white/20 p-2 rounded-full hover:border-accent 
                         hover:text-accent transition-all duration-200"
            >
              <FaSearch className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;