import React from 'react'

function Search({searchTerm, setSearchTerm}) {
  return (
    <div className='search'>
        <div>
            <img src="search.svg" alt="search" />
            <input type="text" placeholder='Search Movies You Like..' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
            {/* <h1 className='text-white'>{searchTerm}</h1> */}
        </div>
      

    </div>
  )
}

export default Search
