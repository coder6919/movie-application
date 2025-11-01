import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='py-4'>
      {/* We use the 'wrapper' class here to make sure its content 
        is aligned with the rest of your page (just like in MovieList.jsx).
      */}
      <div className="py-2">
        <Link to="/" className="text-3xl font-bold text-white transition-opacity hover:opacity-80">
          {/* This span uses the 'text-gradient' class to get that
            exact blue gradient you wanted.
          */}
          <span className="text-gradient">Movie</span>Flix
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
