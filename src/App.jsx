import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';

const BASE_API_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_MOVIE_API;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm]=useState('')
  const[errormsg, setErrorMsg]=useState('')
  const [moviesList, setMoviesList]=useState([])
  const [isLoading,setIsLoading]=useState(false)

  const fetchMovie = async ()=>{
    setIsLoading(true);
    setErrorMsg('');
    try{
      const endpoint = `${BASE_API_URL}/discover/movie?sort_by=popularity.desc`
      const resp = await fetch(endpoint, API_OPTIONS)
      
      if(!resp.ok){
        throw new Error("Failed to fetch data")
      }
      const data = await resp.json();
      if(data.resp == false){
        setErrorMsg(data.Error || "Failed To Fetch Movies")
        setMoviesList([])
        return;
      }
      setMoviesList(data.results || [])
      // console.log(data)
    }
    catch(error){
      console.log(`error fetching data, ${error}`)
      setErrorMsg("Error Fetching movies, please try again later")
    }
    finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    fetchMovie();
  },[])
  return (
    <div>
      <main>
        <div className='pattern'/>
        <div className='wrapper'>
          <header>
            <img src="./hero-img.png" alt="hero" />
            <h1>Find Your favourite <span className='text-gradient'>Movies</span> Here!!</h1>
          </header>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <section className='all-movies'>
            <h1 className="mt-5">All Movies</h1>

            {isLoading ? ( 
              <Spinner/>
            ) : errormsg ? (
              <p className='text-red-600'>{errormsg}</p>
            ) : (
              <ul>
                {
                  moviesList.map((item,index) => {
                    return(
                      <div key={item.id}>
                        <p className='text-white'>{item.title}</p>
                      </div>
                    )
                  })
                }
              </ul>
            )}
          </section>
        </div>
      </main>

    </div>
  )
}

export default App
