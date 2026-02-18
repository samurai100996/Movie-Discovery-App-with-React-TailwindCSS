import { FaStar, FaCalendar, FaPlay } from "react-icons/fa";

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, vote_average, release_date, _overview } = movie;

  const rating = vote_average?.toFixed(1);
  const year = release_date?.split("-")[0];

  const ratingColor =
    rating >= 7 ? "text-green-400" :
    rating >= 5 ? "text-yellow-400" : "text-red-400";

  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative bg-card rounded-xl overflow-hidden cursor-pointer
                 border border-white/5 hover:border-accent/50
                 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20
                 transition-all duration-300"
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3]">
        {poster_path ? (
          <img
            src={`${IMAGE_URL}${poster_path}`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex items-center justify-center">
          <div className="bg-accent/90 rounded-full p-4 transform scale-0 group-hover:scale-100
                          transition-transform duration-300 delay-75">
            <FaPlay className="text-white text-lg ml-1" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1
                        flex items-center gap-1">
          <FaStar className="text-yellow-400 text-xs" />
          <span className={`text-xs font-bold ${ratingColor}`}>{rating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight line-clamp-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
          <FaCalendar className="text-xs" />
          <span>{year || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;