import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { FaLongArrowAltLeft } from "react-icons/fa";

import { useNavigate, useParams } from 'react-router-dom';

// Base URL for API calls, same as in App.jsx
const BASE_API_URL = 'https://api.themoviedb.org/3';

const MovieDetails = ({ API_OPTIONS, BASE_API_URL }) => {

  const { movieId } = useParams()
  const navigate = useNavigate()
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // This function fetches the specific details for one movie
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setErrorMsg('');
      try {
        // We add "append_to_response=videos" to get trailers
        const endpoint = `${BASE_API_URL}/movie/${movieId}?append_to_response=videos`;
        const resp = await fetch(endpoint, API_OPTIONS);

        if (!resp.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await resp.json();
        setMovieDetails(data);

      } catch (error) {
        console.log(`error fetching details, ${error}`);
        setErrorMsg('Error fetching movie details, please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, API_OPTIONS]); // Re-run if the movie ID or API options change

  // Helper to get a clean rating (e.g., "7.8")
  const rating = movieDetails?.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A';

  // Find the official YouTube trailer
  const trailer = movieDetails?.videos?.results?.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  return (
    <section className="movie-details p-4 md:p-8 text-white">
      {/* --- Back Button --- */}
      <button
        onClick={() => navigate(-1)}
        className="btn-fill-hover"
      >
        <FaLongArrowAltLeft />

        <span>Back to Search</span>
      </button>

      {/* --- Loading & Error Handling --- */}
      {isLoading ? (
        <Spinner />
      ) : errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : movieDetails ? (

        /* --- Details Content --- */
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* --- Backdrop Overlay --- */}
          <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 p-6 md:p-12">

            {/* --- Poster --- */}
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-full md:w-1/3 max-w-sm rounded-lg shadow-lg self-start"
            />

            {/* --- Text Content --- */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{movieDetails.title}</h1>
              <p className="text-lg text-gray-300 italic mb-4">{movieDetails.tagline}</p>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-yellow-400 font-bold text-2xl">★ {rating}</span>
                <span className="text-gray-400">{movieDetails.release_date.split('-')[0]}</span>
                <span className="text-gray-400">{movieDetails.runtime} min</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movieDetails.genres.map(genre => (
                  <span key={genre.id} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-200 text-lg mb-8">{movieDetails.overview}</p>

              {/* --- YouTube Trailer --- */}
              {trailer && (
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">Trailer</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      // We are KEEPING the 'playsinline=1' fix
                      src={`https://www.youtube.com/embed/${trailer.key}?playsinline=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      // We are KEEPING the 'fullscreen' and 'web-share' fixes
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      // REVERTED CHANGE: We removed 'absolute top-0 left-0'
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default MovieDetails;
