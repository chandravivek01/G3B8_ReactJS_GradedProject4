import React, { FormEvent } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ChangeEvent } from 'react';

type Props = {
    handleNavClick: (page: string) => void,
    searchKey: string,
    setSearchKey: (val: string) => void
}

// Component to display the Main-Navigation Menu highlighting all the movie-categories.
const Menu = ({ handleNavClick, searchKey, setSearchKey }: Props) => {

    // Accessing the searched entry from the input-end and setting its associated state-variable.
    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setSearchKey(event.target.value);
    }

    // Preventing form-submission
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
    }

    return (
        <>
            {/* Navigation-Bar fixed to the top */}
            <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Movies in Theatre</Nav.Link>
                            <Nav.Link
                                onClick={() => handleNavClick('/comingSoon')}
                                to="/comingSoon" as={NavLink}
                            >
                                Coming Soon
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => handleNavClick('/topRatedIndian')}
                                to="/topRatedIndian" as={NavLink}
                            >
                                Top rated Indian
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => handleNavClick('/topRatedMovies')}
                                to="/topRatedMovies" as={NavLink}
                            >
                                Top rated movies
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => handleNavClick('/favouriteMovies')}
                                to="/favouriteMovies" as={NavLink}
                            >
                                Favourites
                            </Nav.Link>
                        </Nav>
                        {/* Search Form */}
                        <Form className="d-flex" onSubmit={submitHandler}>
                            <Form.Control
                                type="search"
                                placeholder="Search movie"
                                className="me-2"
                                aria-label="Search"
                                value={searchKey}
                                onChange={searchHandler}
                            />

                            <Button variant="outline-success" type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className='my-3' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                <br />
            </Container>
        </>
    )
}

export default Menu