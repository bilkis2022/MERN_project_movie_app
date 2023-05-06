import React from 'react'
import { useLocation } from 'react-router-dom'

const Movie = () => {

    const location = useLocation();
    console.log(location.movie);
  return (
    <div>Movie</div>
  )
}

export default Movie