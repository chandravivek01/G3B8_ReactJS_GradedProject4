import React from 'react'
import MoviesInTheatres from '../../components/MoviesInTheatres'
import IMovie from '../../models/IMovie'

type Props = {
  addToFavourites: (sampleMovie: IMovie) => void,
  movies: IMovie[]
}

const MoviesInTheatrePage = ({ addToFavourites, movies }: Props) => {
  return (
    <MoviesInTheatres addToFavourites={addToFavourites} movies={movies} />
  )
}

export default MoviesInTheatrePage