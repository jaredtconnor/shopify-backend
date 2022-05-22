import react from 'react';
import { Navbar, Container, Button, FormControl, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          Inventory Management System - Shopify
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
