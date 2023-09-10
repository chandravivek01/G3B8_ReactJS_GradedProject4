import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './movie-list-item.css';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IMovie from '../../models/IMovie';

type Props = {
  movie: IMovie,
  localnamespace: string,
  addToFavourites: (sampleMovie: IMovie) => void
}

// Component to display the bootstrap-card
const MovieListItem = ({ movie, localnamespace, addToFavourites }: Props) => {

  const navigate = useNavigate();
  return (
    <>
      <div>
        {/* Filling content for the Bootstarp-Card */}
        <Card style={{width: '220px'}} className='my-card'>
          <Card.Img 
            variant="top" 
            src={movie.posterurl} 
            style={{ width: '100%', height: '350px', objectFit: 'cover', cursor: 'pointer' }}
            className="card-img" 
            onClick={() => ( navigate(`/${localnamespace}/${movie.id}`) )}
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <div 
              className='d-flex justify-content-center align-items-center'
              style={{fontSize: '0.9rem', cursor: 'pointer'}}
              onClick={() => (
                addToFavourites(movie)
              )}
            >
              Add to favourites <FontAwesomeIcon className='mx-2' icon={faHeart} style={{color: 'red'}}/>
            </div>
          </Card.Body>
        </Card>
      </div>
      
    </>
  )
}

export default MovieListItem