import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import IMovie from '../models/IMovie'
import FavouriteListItem from './FavouriteListItem/FavouriteListItem'
import { deleteMovieByIdFromFavourites, getMoviesFromFavourites } from '../services/movies'

type Props = {
    favouriteMovies: IMovie[],
    setFavouriteMovies: (favList: IMovie[]) => void,
    setStatus: (stats: string) => void
}

const FavouriteMovies = ({ favouriteMovies, setFavouriteMovies, setStatus }: Props) => {

    const navigate = useNavigate();
    const getMovies = async () => {
        const data = await getMoviesFromFavourites();
        setFavouriteMovies(data)
        setStatus('success');
        navigate('/favouriteMovies');
    }

    const deleteMovie = async (id: string | number) => {
        await deleteMovieByIdFromFavourites(id);
        getMovies();
    }

    return (
        <>
            {/* If there are no items in the favourite, then throwing 'Data not found' */}
            {
                favouriteMovies.length !== 0
                    ?
                    (
                        <Row xs={1} md={2} lg={4} xl={5}>
                            {
                                favouriteMovies.map((movie) => (
                                    <Col key={movie.id} className='d-flex my-3'>
                                        <FavouriteListItem movie={movie} deleteMovie={deleteMovie} />
                                    </Col>
                                ))
                            }
                        </Row>
                    )
                    :
                    <div className='d-flex justify-content-center align-items-center h2' style={{ height: '100vh' }}>
                        No data found
                    </div>
            }
        </>
    )
}

export default FavouriteMovies