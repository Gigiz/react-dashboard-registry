import React, { useContext } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from './RootContext';

const Header = () => {

  const { authenticated, username } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Registry App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/" activeClassName=""><Nav.Link>Home</Nav.Link></LinkContainer>
          <LinkContainer to="/other" activeClassName=""><Nav.Link>Other Page</Nav.Link></LinkContainer>
          <NavDropdown title="Manager" id="basic-nav-dropdown">
            <LinkContainer to="/registry" activeClassName=""><NavDropdown.Item>View</NavDropdown.Item></LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/upload" activeClassName=""><NavDropdown.Item>Upload</NavDropdown.Item></LinkContainer>
          </NavDropdown>
        </Nav>
        {!authenticated && (
          <Nav className="justify-content-end">
            <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
          </Nav>
        )}
        {authenticated &&(
          <Nav className="justify-content-end">
            <Nav.Link onClick={ ()=> {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}>
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;