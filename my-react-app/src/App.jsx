import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';

//171d9b21
const API_URL = 'http://www.omdbapi.com?apikey=171d9b21';
const movie = {
  "Title": "The Lord of the Rings: The Fellowship of the Ring",
  "Year": "2001",
  "imdbID": "tt0120737",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"
}

export default function App () {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  }

  useEffect(() => {
    searchMovies('Avengers')
  }, []);

  return (
    <div className='app'>
      <h1>Filmonacija</h1>

      <div className='search'>
        <input 
          placeholder='Potraži film'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div 
        onClick={() => searchMovies(searchTerm)}
        className='cross'></div>
      </div>

      {
        movies?.length > 0 
          ? (<div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
            ))} 
        </div>) :
        (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )

      }

    </div>
  )
}