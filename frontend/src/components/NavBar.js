import react from "react"
import { Navbar, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>Inventory Management System - Shopify</Navbar.Brand>
            </Container>
        </Navbar>

    )
}

export default NavBar; 