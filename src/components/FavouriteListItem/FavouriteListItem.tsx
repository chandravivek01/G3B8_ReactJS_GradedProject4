import React from 'react'
import { Card } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'

import IMovie from '../../models/IMovie'
import { useNavigate } from 'react-router-dom';

type Props = {
    movie: IMovie
    deleteMovie: (id: string | number) => void
}

const FavouriteListItem = ({ movie, deleteMovie }: Props) => {

    const navigate = useNavigate();
    return (
        <>
            <Card style={{ width: '220px' }} className='my-card'>
                <Card.Img
                    variant="top"
                    src={movie.posterurl}
                    style={{ width: '100%', height: '350px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => (navigate(`/favouriteMovies/${movie.id}`))}
                    className="card-img"
                />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <div
                        className='d-flex justify-content-center align-items-center'
                        style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                        onClick={() => {
                            deleteMovie(movie.id);
                        }}
                    >
                        Remove from favourites <FontAwesomeIcon className='mx-2' icon={faXmarkSquare} />
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default FavouriteListItem