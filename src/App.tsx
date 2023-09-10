import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import MoviesInTheatrePage from './pages/MoviesInTheatre/MoviesInTheatrePage';
import ComingSoonPage from './pages/ComingSoon/ComingSoonPage';
import TopRatedIndianPage from './pages/TopRatedIndian/TopRatedIndianPage';
import TopRatedMoviesPage from './pages/TopRatedMovies/TopRatedMoviesPage';
import Menu from './components/Menu/Menu';
import MovieDetailsPage from './pages/MovieDetails/MovieDetailsPage';
import FavouriteMovies from './components/FavouriteMovies';
import IMovie from './models/IMovie';
import { getMoviesComingSoon, getMoviesFavourites, getMoviesFromFavourites, getMoviesInTheatres, getMoviesTopRatedIndian, getMoviesTopRatedMovies, postMoviesToFavourites } from './services/movies';

import ShowAlert from './components/Alert/ShowAlert';
import AlertDisplay from './components/Alert/AlertDisplay';
import BackNavMenu from './components/Menu/BackNavMenu';

function App() {

  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [origialMovies, setOriginalMovies] = useState<IMovie[]>([]);
  const [statuses, setStatuses] = useState('');
  const [status, setStatus] = useState('');
  const [namespace, setNamespace] = useState<string>('/');
  const [searchList, setSearchList] = useState<IMovie[]>([]);
  const [favouriteMovies, setFavouriteMovies] = useState<IMovie[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [navState, setNavState] = useState<boolean>(true);

  // Initial-load/ initialization of state-variables pertaining to movies belonging to each category or from favourites.
  // Category refers to Movies in Theatres, Coming Soon, ...
  useEffect(
    () => {
      const fetchMovies = async () => {

        const data = await getMoviesInTheatres();
        setOriginalMovies(data);
        setMovies(data);
        setSearchList(data);
        const dataset = await getMoviesFavourites();
        setFavouriteMovies(dataset);
      }
      fetchMovies();
    },
    []
  );

  // Based on the url-namespace, loading/ setting the state-variable to the appropriate category..
  useEffect(
    () => {

      if (namespace === '/')
        navigate('/');

      else if (namespace === '/comingSoon')
        navigate('/comingSoon');

      else if (namespace === '/topRatedIndian')
        navigate('/topRatedIndian');

      else if (namespace === '/topRatedMovies')
        navigate('/topRatedMovies');

      else if (namespace === '/favouriteMovies')
        navigate('/favouriteMovies');
    },
    [movies]
  );

  // Listening to OnChange Event triggered from the Search-Query and updating the state-variables accordingly.
  useEffect(
    () => {
      const searchAgain = (searchedValue: string) => {

        let filteredMovie = searchList.filter(item => item.title.toLowerCase().includes(searchedValue.toLowerCase()));
        if (namespace === '/favouriteMovies')
          setFavouriteMovies(filteredMovie);
        else
          setMovies(filteredMovie);
      }
      searchAgain(searchKey);
    },
    [searchKey, searchList]
  );

  // Make the Alert-message visible for 2 seconds on successful insertion to the favourites otherwise throwing an error message.
  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setStatuses('');
    }, 2000);

    return () => {
      clearTimeout(alertTimer);
    };
  });

  // Make the Alert-message visible for 2 seconds on successful removal from the favourites.
  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setStatus('');
    }, 2000);

    return () => {
      clearTimeout(alertTimer);
    };
  });

  // Utility-function to set state for the namespace upon selection of a movie-category & accordingly setting the respective state variables.
  // Ex:- Movies in Theatres, Coming Soon, ...
  const handleNavClick = (chosenNamespace: string) => {

    setNamespace(chosenNamespace);
    const fetchMovies = async () => {

      if (chosenNamespace === '/') {

        const data = await getMoviesInTheatres();
        setOriginalMovies(data);
        setMovies(data);
        setSearchList(data);
      }
      else if (chosenNamespace === '/comingSoon') {

        const data = await getMoviesComingSoon();
        setOriginalMovies(data);
        setMovies(data);
        setSearchList(data);
      }
      else if (chosenNamespace === '/topRatedIndian') {

        const data = await getMoviesTopRatedIndian();
        setOriginalMovies(data);
        setMovies(data);
        setSearchList(data);
      }
      else if (chosenNamespace === '/topRatedMovies') {

        const data = await getMoviesTopRatedMovies();
        setOriginalMovies(data);
        setMovies(data);
        setSearchList(data);
      }
      else if (chosenNamespace === '/favouriteMovies') {

        const data = await getMoviesFromFavourites();
        setFavouriteMovies(data);
        setSearchList(data);
      }
    }
    fetchMovies();
  };

  // Utility-function to inject movie-item to the favourites into the server-file.
  const pushToServer = async (sampleMovie: IMovie) => {
    await postMoviesToFavourites(sampleMovie);
  }

  // Utility-function to set state for favourite-movie-items-list.
  const addToFavourites = (sampleMovie: IMovie) => {

    const matchingMovie = favouriteMovies.find(movie => (movie.id === sampleMovie.id));

    { matchingMovie ? setStatuses('error') : setStatuses('success') }

    if (matchingMovie) {

      const updatedMovies = [...favouriteMovies];
      setFavouriteMovies(updatedMovies);
    }
    else {

      const updatedMovies: IMovie[] = [...favouriteMovies, sampleMovie];
      pushToServer(sampleMovie);
      setFavouriteMovies(updatedMovies);
    }
  }

  return (
    <div className="App">

      {/* Switching between Main Navigation Menu and Back-button-Navigation */}
      {
        navState &&
        <Menu handleNavClick={handleNavClick} searchKey={searchKey} setSearchKey={setSearchKey} />
      }
      {
        !navState &&
        <>
          <BackNavMenu namespace={namespace} setNavState={setNavState} />
          <br />
          <br />
          <br />
        </>
      }

      {/* Displaying Alert messages for successful insertion tp favourites otherwise displaying an Error message. */}
      <AlertDisplay statuses={statuses} />

      {/* Displayinf Alert message for successful removal of movie-item from the favourites. */}
      <ShowAlert status={status} />

      {/* The Router-Section  */}
      <Container>
        <Routes>
          <Route path='/' element={<MoviesInTheatrePage addToFavourites={addToFavourites} movies={movies} />} />
          <Route
            path='/comingSoon' element={<ComingSoonPage addToFavourites={addToFavourites} movies={movies} />}
          />
          <Route
            path='/topRatedIndian'
            element={<TopRatedIndianPage addToFavourites={addToFavourites} movies={movies} />}
          />
          <Route
            path='/topRatedMovies'
            element={<TopRatedMoviesPage addToFavourites={addToFavourites} movies={movies} />}
          />
          <Route
            path='/favouriteMovies'
            element={<FavouriteMovies
              favouriteMovies={favouriteMovies}
              setFavouriteMovies={setFavouriteMovies}
              setStatus={setStatus} />}
          />
          <Route path='/moviesInTheatres/:id' element={<MovieDetailsPage namespace="moviesInTheatres" setNavState={setNavState} />} />
          <Route path='/comingSoon/:id' element={<MovieDetailsPage namespace="comingSoon" setNavState={setNavState} />} />
          <Route path='/topRatedIndian/:id' element={<MovieDetailsPage namespace="topRatedIndian" setNavState={setNavState} />} />
          <Route path='/topRatedMovies/:id' element={<MovieDetailsPage namespace="topRatedMovies" setNavState={setNavState} />} />
          <Route path='/favouriteMovies/:id' element={<MovieDetailsPage namespace="favouriteMovies" setNavState={setNavState} />} />
        </Routes>
      </Container>

    </div>
  );
}

export default App;
