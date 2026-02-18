import { useEffect, useState } from "react";
import { FaTimes, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

const TrailerModal = ({ movieId, movieTitle, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const data = await res.json();

        // Filter for YouTube trailers, prefer official ones
        const videos = data.results || [];

        const trailer =
          videos.find(
            (v) =>
              v.site === "YouTube" &&
              v.type === "Trailer" &&
              v.official === true
          ) ||
          videos.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          ) ||
          videos.find(
            (v) => v.site === "YouTube" && v.type === "Teaser"
          ) ||
          videos.find((v) => v.site === "YouTube");

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError("No trailer available for this movie.");
        }
      } catch (err) {
        setError("Failed to load trailer. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl animate-[fadeIn_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
              Now Playing
            </p>
            <h2 className="text-white text-xl font-bold truncate max-w-[500px]">
              {movieTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-accent text-white rounded-full p-2.5
                       transition-all duration-200 hover:scale-110 flex-shrink-0 ml-4"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10
                        shadow-2xl shadow-black">
          
          {/* 16:9 Aspect Ratio Box */}
          <div className="aspect-video w-full">
            
            {/* Loading State */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary">
                <FaSpinner className="text-accent text-4xl animate-spin mb-4" />
                <p className="text-gray-400 text-sm">Loading trailer...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary">
                <FaExclamationTriangle className="text-yellow-400 text-5xl mb-4" />
                <p className="text-white font-semibold text-lg mb-2">
                  Oops!
                </p>
                <p className="text-gray-400 text-sm text-center max-w-xs">
                  {error}
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-accent hover:bg-accent/80 text-white px-6 py-2
                             rounded-full text-sm font-medium transition-colors"
                >
                  Go Back
                </button>
              </div>
            )}

            {/* YouTube iFrame */}
            {trailerKey && !loading && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title={`${movieTitle} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Footer */}
        {trailerKey && !loading && (
          <div className="flex items-center justify-between mt-3 px-1">
            <p className="text-gray-500 text-xs">
              🎬 Source: YouTube via TMDB
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 text-xs font-medium
                         transition-colors underline underline-offset-2"
            >
              Watch on YouTube ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;