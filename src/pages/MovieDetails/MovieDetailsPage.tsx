import React from 'react'
import MovieDetails from '../../components/MovieDetails/MovieDetails'

type Props = {
  namespace: string,
  setNavState: (val: boolean) => void
}

const MovieDetailsPage = ({ namespace, setNavState }: Props) => {

  return (
    <>
      <MovieDetails localnamespace={namespace} setNavState={setNavState} />
    </>
  )
}

export default MovieDetailsPage