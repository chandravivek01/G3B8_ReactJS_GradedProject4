import React from 'react'
import ComingSoon from '../../components/ComingSoon'
import IMovie from '../../models/IMovie'

type Props = {
  addToFavourites: (sampleMovie: IMovie) => void,
  movies: IMovie[]
}

const ComingSoonPage = ({ addToFavourites, movies }: Props) => {
  return (
    <ComingSoon addToFavourites={addToFavourites} movies={movies} />
  )
}

export default ComingSoonPage