import React from 'react'

function MovieCArd({movie}) {
  if (!movie) {
    return null;
  }

  // Now that we know 'movie' exists, we can safely destructure it
  const { title, vote_average, poster_path, release_date, original_language } = movie;
  return (
    <div className='movie-card 
                 transition 
                 duration-300 
                 ease-in-out 
                 hover:scale-103 
                 hover:bg-slate-800' style={{cursor:"pointer"}}>
      {/* <p className='text-white'>{title}</p> */}
      {/* image of movie */}
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'No-Poster.png'} alt={title}/>

      {/* title of movie */}
      <div className='mt-4'>
        <h3 className='transition duration-300 hover:text-white'>{title}</h3>
        <div className='content transition duration-300 hover:text-gray-300'>
            <div className='rating'>
                <img src="star.svg" alt="star icon" />
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <span>*</span>
            <p className='lang'>{original_language}</p>
            <span>*</span>
            <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCArd
