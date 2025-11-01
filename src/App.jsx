import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {

  // console.log("--- APP.JSX LAYOUT IS RENDERING ---");
  return (
    <div>
      <main>
        {/* This is the "placeholder".
          React Router will fill this with <MovieList /> on the home page
          and <MovieDetails /> on the details page based on the URL.
        */}
        {/* <h1 style={{ color: 'white', fontSize: '30px' }}>APP LAYOUT WORKS</h1> */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
