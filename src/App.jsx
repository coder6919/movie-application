import React, { useState } from 'react'
import Search from './components/Search'


function App() {
  const [searchTerm, setSearchTerm]=useState('')
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
        </div>
      </main>

    </div>
  )
}

export default App
