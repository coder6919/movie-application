import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for the logo

function Footer() {
  return (
    // We remove the extra div, bg-white, rounded, shadow, and margin classes
    // We add a top border to separate it from the content and some margin-top
    <footer className="border-t border-gray-800 mt-16">
      
      {/* This is the most important change:
        We replace "max-w-7xl" with your site's "wrapper" class 
        to ensure the content aligns perfectly with your NavBar and MovieList.
      */}
      <div className="wrapper w-full mx-auto p-4 py-8 md:flex md:items-center md:justify-between">
        
        {/* We update the text color to be lighter (text-gray-400) */}
        <span className="text-sm text-gray-400 sm:text-center">
          © 2025{' '}
          {/* We use your site's gradient logo style here */}
          <Link to="/" className="text-sm font-bold transition-opacity hover:opacity-80">
            <span className="text-gradient">Movie</span>Flix
          </Link>
          . Made By Syed Saifuddin.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
          <li>
            <a href="https://www.linkedin.com/in/syed-saifuddin-a56564217/" target="_blank" rel="noopener noreferrer" className="hover:underline me-4 md:me-6">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/coder6919" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
