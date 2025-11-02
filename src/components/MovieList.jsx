import React, { useEffect, useState } from 'react'
import Search from './Search'
import Spinner from './Spinner';
import MovieCArd from './MovieCArd';
import { useDebounce } from '@uidotdev/usehooks';
import { updateSearchCount } from '../appwrite';
import { Link } from 'react-router-dom';
import HeaderCarousel from './HeaderCarousel'; // Import your new component
import NavBar from './NavBar';
import Footer from './Footer'
// We don't import MovieDetails here anymore

const BASE_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_MOVIE_API;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

// This component is now your home page
function MovieList({ API_OPTIONS, BASE_API_URL }) {
  // All the state from your App.jsx lives here now
  const [searchTerm, setSearchTerm] = useState('')
  const [errormsg, setErrorMsg] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // We removed selectedMovieId

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // The fetchMovie function from your App.jsx
  const fetchMovie = async (query = '') => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const endpoint = query ? `${BASE_API_URL}/search/movie?query=${encodeURIComponent(query)}` :
        `${BASE_API_URL}/discover/movie?sort_by=popularity.desc`
      const resp = await fetch(endpoint, API_OPTIONS)

      if (!resp.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await resp.json();
      if (data.resp == false) {
        setErrorMsg(data.Error || "Failed To Fetch Movies")
        setMoviesList([])
        return;
      }
      setMoviesList(data.results || [])
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }
    }
    catch (error) {
      console.log(`error fetching data, ${error}`)
      setErrorMsg("Error Fetching movies, please try again later")
    }
    finally {
      setIsLoading(false);
    }
  }

  // The useEffect from your App.jsx
  useEffect(() => {
    fetchMovie(debouncedSearchTerm);
  }, [debouncedSearchTerm, API_OPTIONS, BASE_API_URL ])
  // test if you cant see content of movielist
  //   console.log('--- DEBUGGING MOVIELIST ---');
  //   console.log('Is Loading:', isLoading);
  //   console.log('Error Message:', errormsg);
  //   console.log('Movies List:', moviesList);

  // The JSX from your App.jsx's "else" block
  return (
    <>
    {/* this is the navbar */}
      
{/* ------------------------------------------ */}
      <div className='pattern' />
      <div className='wrapper'>
        <NavBar/>
        {/* We only show the carousel if movies have loaded and it's not a search */}
        {!searchTerm && moviesList.length > 0 && (
          <HeaderCarousel movies={moviesList.slice(0, 10)} />
        )}

        {/* This is your title, now separate from the header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center my-8 text-white">
          Find Your Favourite <span className='text-gradient'>Movies</span> Here!!
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className='all-movies'>
          <h1 className="mt-5">
            {searchTerm ? `Results for "${searchTerm}"` : "Popular Movies"}

          </h1>
          {isLoading ? (
            <Spinner />
          ) : errormsg ? (
            <p className='text-red-600'>{errormsg}</p>
          ) : (
            <ul>
              {
                moviesList.map((movie) => {
                  return (
                    // MovieCArd will be updated to be a <Link>
                    // We remove onMovieSelect
                    <Link to={`/movie/${movie.id}`} key={movie.id}><MovieCArd movie={movie} /></Link>
                  )
                })
              }
            </ul>
          )}
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default MovieList;

