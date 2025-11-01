import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import MovieDetails from './components/MovieDetails.jsx';
import MovieList from './components/MovieList.jsx';

const BASE_API_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_MOVIE_API;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element: <MovieList API_OPTIONS={API_OPTIONS} BASE_API_URL={BASE_API_URL}/>,
      },
      {
        path:'movie/:movieId',
        element:<MovieDetails API_OPTIONS={API_OPTIONS} BASE_API_URL={BASE_API_URL}/>
      },
    ],
  },

]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
