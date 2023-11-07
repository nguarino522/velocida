import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom"
import UserContext from "../UserContext";
import "./NavBar.css"
import img from "../assets/runner.png"

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => {
    return (
      <Navbar className="NavBar" >
        <Navbar.Brand className="m-3" href="/"><img src={img} />Velocida</Navbar.Brand>
        <Nav variant="pills" className="ms-right p-3" activeKey={window.location.pathname}>
          <Nav.Link className="nav-link" href="/">Home</Nav.Link>
          <Nav.Link className="nav-link" href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link className="nav-link" href="/news">News</Nav.Link>
          <Nav.Link className="nav-link" href="/forum">Forum</Nav.Link>
        </Nav>
        <Nav variant="pills" className="ms-auto p-3">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/" onClick={logout} >Logout {currentUser.username}</Nav.Link>
        </Nav>
      </Navbar>
    )
  }

  const loggedOutNav = () => {
    return (
      <Navbar className="NavBar">
        <Navbar.Brand className="m-3" href="/"><img src={img} />Velocida</Navbar.Brand>
        <Nav variant="pills" className="ms-right p-3" activeKey={window.location.pathname}>
          <Nav.Link className="nav-link" href="/">Home</Nav.Link>
          <Nav.Link href="/news">News</Nav.Link>
          <Nav.Link className="nav-link" href="/forum">Forum</Nav.Link>
        </Nav>
        <Nav variant="pills" className="ms-auto p-3" activeKey={window.location.pathname}>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">SignUp</Nav.Link>
        </Nav>
      </Navbar>
    )
  }

  return (
    <>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </>
  );
};

export default NavBar;