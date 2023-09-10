import React from 'react'
import TopRatedIndian from '../../components/TopRatedIndian'
import IMovie from '../../models/IMovie'

type Props = {
  addToFavourites: (sampleMovie: IMovie) => void,
  movies: IMovie[]
}

const TopRatedIndianPage = ({ addToFavourites, movies }: Props) => {
  return (
    <TopRatedIndian addToFavourites={addToFavourites} movies={movies} />
  )
}

export default TopRatedIndianPage