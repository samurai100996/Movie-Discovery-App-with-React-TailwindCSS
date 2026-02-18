import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { FaSpinner, FaSearch, FaSadTear } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const Home = ({ searchQuery, category }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let url;
      if (searchQuery) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
      } else {
        url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`;
      }

      const { data } = await axios.get(url);
      
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
    } catch {
      setError("Failed to fetch movies. Please check your API key.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, category, page]);

  // Fetch movie details for modal
  const fetchMovieDetails = async (movie) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
      );
      setSelectedMovie(data);
    } catch {
      setSelectedMovie(movie);
    }
  };

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [searchQuery, category]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const title = searchQuery
    ? `Results for "${searchQuery}"`
    : category.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Hero */}
      {!searchQuery && page === 1 && (
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-red-500">
            Discover <span className="text-accent">Amazing</span> Movies
          </h1>
          <p className="text-gray-400 text-lg">
            Explore thousands of movies from around the world
          </p>
        </div>
      )}

      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {searchQuery ? (
            <span className="flex items-center gap-2">
              <FaSearch className="text-accent text-lg" /> {title}
            </span>
          ) : title}
        </h2>
        {movies.length > 0 && (
          <span className="text-gray-500 text-sm">{movies.length} movies</span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      )}

      {/* Movies Grid */}
      {!error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={fetchMovieDetails}
              />
            ))}
          </div>

          {/* Empty State */}
          {!loading && movies.length === 0 && (
            <div className="text-center py-20">
              <FaSadTear className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-xl">No movies found</p>
              <p className="text-gray-600 text-sm mt-2">Try a different search term</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-12">
              <FaSpinner className="text-accent text-4xl animate-spin" />
            </div>
          )}

          {/* Load More */}
          {!loading && page < totalPages && movies.length > 0 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="bg-accent hover:bg-accent/80 text-red-900 px-8 py-3 rounded-full
                           font-semibold transition-all duration-200 hover:shadow-lg
                           hover:shadow-accent/30 transform hover:scale-105 "
              >
                Load More Movies
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Home;