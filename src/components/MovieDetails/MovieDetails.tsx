import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Modal, Row } from 'react-bootstrap';

import './movie-details.css';

import IMovie from '../../models/IMovie';
import { getMovieFromFavouritesById, getMoviesComingSoonById, getMoviesInTheatresById, getMoviesTopRatedIndianById, getMoviesTopRatedMoviesById } from '../../services/movies';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  localnamespace: string,
  setNavState: (val: boolean) => void
}

type Params = {
  id: string
}

// Component to display the details of a particular movie.
const MovieDetails = ({ localnamespace, setNavState }: Props) => {

  const { id } = useParams<Params>();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Inital-load of a movie item/document by its id.
  useEffect(
    () => {
      const fetchMovie = async () => {

        switch (localnamespace) {

          case 'moviesInTheatres':
            const theatreMovie = await getMoviesInTheatresById(id as any); // Status 304 (load from Cache)
            setMovie(theatreMovie);
            setNavState(false);
            break;

          case 'comingSoon':
            const comingSoonMovie = await getMoviesComingSoonById(id as any); // Status 304 (load from Cache)
            setMovie(comingSoonMovie);
            setNavState(false);
            break;

          case 'topRatedIndian':
            const topRatedIndianMovie = await getMoviesTopRatedIndianById(id as any); // Status 304 (load from Cache)
            setMovie(topRatedIndianMovie);
            setNavState(false);
            break;

          case 'topRatedMovies':
            const topRatedMovie = await getMoviesTopRatedMoviesById(id as any); // Status 304 (load from Cache)
            setMovie(topRatedMovie);
            setNavState(false);
            break;

          case 'favouriteMovies':
            const favouriteMovie = await getMovieFromFavouritesById(id as any); // Status 304 (load from Cache)
            setMovie(favouriteMovie);
            setNavState(false);
            break;
        }
      }
      fetchMovie();
    },
    []
  );
  return (
    <>
      {/* Populating the detailed content of a movie. */}
      <Row>
        <Col lg={4}>
          {/* To overlay the image with a preview-text on being hovered */}
          <div className='image-container'>
            <div className="overlay" onClick={handleShow} >
              <p className="overlay-text"><FontAwesomeIcon icon={faEye} />Preview</p>
            </div>
            <img
              src={movie?.posterurl}
              alt="not available"
              className='image-preview'
              onClick={handleShow}
            />
          </div>
        </Col>
        <Col md={12} lg={8}>
          <Row>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{movie?.title}({movie?.year})</div>
          </Row>
          <Row>
            <Col>Imdb Rating</Col>
            <Col>{movie?.imdbRating}</Col>
          </Row>
          <Row>
            <Col>Content Rating</Col>
            <Col>{movie?.contentRating}</Col>
          </Row>
          <Row>
            <Col>Average Rating</Col>
            <Col>{movie?.averageRating}</Col>
          </Row>
          <Row>
            <Col>Duration</Col>
            <Col>{movie?.duration}</Col>
          </Row>
          <Row>
            <Col>Genres</Col>
            <Col>{movie?.genres}</Col>
          </Row>
          <Row>
            <Col>Actors</Col>
            <Col>{movie?.actors}</Col>
          </Row>
          <Row>
            <Col>Release Date</Col>
            <Col>{movie?.releaseDate}</Col>
          </Row>
          <Row>
            <Col>Storyline</Col>
            <Col>{movie?.storyline}</Col>
          </Row>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} className='custom-modal' centered>
        <Modal.Body>
          <img src={movie?.posterurl} alt="Preview" style={{ objectFit: 'cover' }} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MovieDetails
