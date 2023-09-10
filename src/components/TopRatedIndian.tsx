import React from 'react'
import { Row, Col } from 'react-bootstrap';

import IMovie from '../models/IMovie';
import MovieListItem from './MovieListItem/MovieListItem';

type Props = {
  addToFavourites: (sampleMovie: IMovie) => void,
  movies: IMovie[]
}

const namespace: string = "topRatedIndian";
const TopRatedIndian = ({ addToFavourites, movies }: Props) => {

  return (
    <>
      <Row xs={1} md={2} lg={4} xl={5}>
        {
          movies.map(movie => (
            <Col key={movie.id} className='d-flex my-3'>
              <MovieListItem key={movie.id} movie={movie} localnamespace={namespace} addToFavourites={addToFavourites} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default TopRatedIndian