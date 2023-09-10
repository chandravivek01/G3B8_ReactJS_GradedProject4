import React from 'react'
import TopRatedMovies from '../../components/TopRatedMovies'
import IMovie from '../../models/IMovie'

type Props = {
  addToFavourites: (sampleMovie: IMovie) => void,
  movies: IMovie[]
}

const TopRatedMoviesPage = ({ addToFavourites, movies }: Props) => {
  return (
    <TopRatedMovies addToFavourites={addToFavourites} movies={movies} />
  )
}

export default TopRatedMoviesPage