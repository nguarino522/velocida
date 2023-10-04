import React, { useContext } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import UserContext from "../UserContext";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  
  const loggedInNav = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="m-3" href="/">Velocida</Navbar.Brand>
        <Nav className="ms-auto p-3">
          <Nav.Link href="/companies">Companies</Nav.Link>
          <Nav.Link href="/jobs">Jobs</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/" onClick={logout} >Logout {currentUser.username}</Nav.Link>
        </Nav>
      </Navbar>
    )
  }

  const loggedOutNav = () => {
    return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="m-3" href="/">Velocida</Navbar.Brand>
      <Nav className="ms-auto p-3">
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/signup">SignUp</Nav.Link>
      </Nav>
    </Navbar>
    )
  }

  return (
    <>
        loggedOutNav()
      {/* {currentUser ? loggedInNav() : loggedOutNav()} */}
    </>
  );
};

export default NavBar;