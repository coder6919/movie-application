import React from 'react';
import { Link } from 'react-router-dom';

const HeaderCarousel = ({ movies }) => {
  // We need to duplicate the movie list to create the seamless infinite loop
  const duplicatedMovies = [...movies, ...movies];

  // User wanted a 2s delay per item. 10 items * 2s = 20s animation
  const animationDuration = `${movies.length * 2}s`;

  return (
    <div className="carousel-container mb-8">
      {/* This track contains the duplicated list.
        The CSS animation will move this entire track.
      */}
      <div 
        className="carousel-track" 
        style={{ animationDuration: animationDuration }}
      >
        {duplicatedMovies.map((movie, index) => (
          <Link 
            to={`/movie/${movie.id}`} 
            key={`${movie.id}-${index}`} 
            className="carousel-item shrink-0 w-40 md:w-52 p-2"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderCarousel;
