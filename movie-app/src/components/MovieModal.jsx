import { useEffect, useState } from "react";
import { FaStar, FaCalendar, FaTimes, FaFilm, FaClock, FaPlay } from "react-icons/fa";
import TrailerModal from "./TrailerModal";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const MovieModal = ({ movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!movie) return null;

  const {
    id, title, overview, vote_average, release_date,
    backdrop_path, poster_path, genres, runtime,
    vote_count, popularity,
  } = movie;

  const rating = vote_average?.toFixed(1);
  const year = release_date?.split("-")[0];

  return (
    <>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <div
          className="relative bg-secondary rounded-2xl overflow-hidden max-w-3xl w-full
                     max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10
                     animate-[fadeIn_0.3s_ease]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-accent
                       rounded-full p-2 transition-colors duration-200"
          >
            <FaTimes />
          </button>

          {/* Backdrop Image */}
          {backdrop_path && (
            <div className="relative h-56 md:h-72 overflow-hidden">
              <img
                src={`${IMAGE_URL}${backdrop_path}`}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent" />

              {/* ▶️ Play Trailer Button on Backdrop */}
              <button
                onClick={() => setShowTrailer(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="bg-accent/90 group-hover:bg-accent group-hover:scale-110
                                rounded-full p-5 shadow-2xl shadow-accent/50
                                transition-all duration-300 border-4 border-white/20">
                  <FaPlay className="text-white text-2xl ml-1" />
                </div>
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-6 -mt-16 relative">
            <div className="flex gap-4">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={`${POSTER_URL}${poster_path}`}
                  alt={title}
                  className="w-28 md:w-36 rounded-xl shadow-xl border-2 border-accent/30"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">{title}</h2>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaCalendar className="text-accent" /> {year}
                  </span>
                  {runtime && (
                    <span className="flex items-center gap-1">
                      <FaClock className="text-accent" /> {runtime} min
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-white font-semibold">{rating}</span>
                    <span className="text-gray-500">
                      ({vote_count?.toLocaleString()} votes)
                    </span>
                  </span>
                </div>

                {/* Genres */}
                {genres && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {genres.map((g) => (
                      <span
                        key={g.id}
                        className="bg-accent/20 text-accent border border-accent/30
                                   text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* ▶️ Watch Trailer Button */}
                <button
                  onClick={() => setShowTrailer(true)}
                  className="mt-4 flex items-center gap-2 bg-accent hover:bg-accent/80
                             text-white px-5 py-2.5 rounded-full font-semibold text-sm
                             transition-all duration-200 hover:shadow-lg hover:shadow-accent/30
                             hover:scale-105 active:scale-95"
                >
                  <FaPlay className="text-xs" />
                  Watch Trailer
                </button>
              </div>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <FaFilm className="text-accent" /> Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {overview || "No overview available."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: "Rating", value: `${rating}/10` },
                { label: "Popularity", value: popularity?.toFixed(0) },
                { label: "Year", value: year },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-primary/50 rounded-xl p-3 text-center border border-white/5"
                >
                  <p className="text-accent font-bold text-lg">{value}</p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal — renders on top of MovieModal */}
      {showTrailer && (
        <TrailerModal
          movieId={id}
          movieTitle={title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
};

export default MovieModal;