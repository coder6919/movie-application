🎬 MovieFlix: A Modern Movie Discovery App

MovieFlix is a sleek, responsive movie search and discovery application built with React, Vite, and Tailwind CSS. It connects to the TMDB API for real-time movie data and uses Appwrite as a backend to log and count popular search terms.

Live Demo: https://movie-flix69.netlify.app/

✨ Key Features

Popular Movie Discovery: The homepage greets users with a list of the most popular movies, fetched directly from the TMDB API.

Animated Header Carousel: An infinite-scrolling carousel (built with CSS animations) showcases popular movies and is fully clickable.

Dynamic Search: A real-time search bar that uses useDebounce to prevent excessive API calls while the user is typing.

React Router v6: A modern, multi-page routing setup using react-router-dom to create distinct pages for the movie list (/) and movie details (/movie/:id).

Detailed Movie View: Clicking a movie card navigates to a dedicated details page, which loads additional information like genres, runtime, and an embedded YouTube trailer.

Appwrite Backend: Intelligently logs all unique search terms to an Appwrite database. If a term is searched again, its count is incremented instead of creating a new entry.

Responsive & Styled: Fully responsive design using Tailwind CSS and custom utility classes for a clean, dark-mode UI with gradient text and hover effects.

🚀 Technologies Used

Frontend: React 18 (with Hooks)

Build Tool: Vite

Routing: React Router v6 (react-router-dom)

Styling: Tailwind CSS (with custom @layer components)

Backend: Appwrite (for database)

Data: The Movie Database (TMDB) API

🛠️ Setup & Installation

To run this project locally, follow these steps:

Clone the repository:

git clone [https://github.com/coder6919/movie-application.git](https://github.com/coder6919/movie-application.git)
cd movie-application


Install dependencies:

npm install


Create your environment file:
Create a file named .env.local in the root of the project and add your API keys:

# Get this from your TMDB API settings
VITE_MOVIE_API=your_tmdb_api_bearer_token

# Get these from your Appwrite project settings
VITE_APPWRITE_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_TABLE_ID=your_appwrite_collection_id


Run the development server:

npm run dev


Your project will be available at http://localhost:5173.

🚀 Deployment to Netlify

This project is configured for a seamless deployment to Netlify.

Build Command: npm run build

Publish Directory: dist

Crucial Step: React Router Redirect

To ensure your React Router routes (like /movie/123) work correctly on Netlify, you must have a _redirects file.

Create a file named _redirects inside your public/ folder.

Add the following line to it:

/* /index.html    200


This tells Netlify to send all page requests to your index.html file, allowing React Router to handle the navigation.