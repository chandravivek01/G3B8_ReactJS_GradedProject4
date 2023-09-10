import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

type Props = {
    namespace: string,
    setNavState: (val: boolean) => void
}

// Component which replaces the Main-Navigation-Menu (when a particular movie-details needs to be served).
const BackNavMenu = ({ namespace, setNavState }: Props) => {

    const navStateHandler = () => {
        setNavState(true);
    }
    return (
        // Fixing the Navigation-bar to the top
        <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link to={namespace} as={NavLink} onClick={navStateHandler}>Back</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default BackNavMenu