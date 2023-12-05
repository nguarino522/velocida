import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom"
import UserContext from "../UserContext";
import "./NavBar.css"
import img from "../assets/runner.png"

const NavBar = ({ logout, showToast }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => {
    return (
      <Navbar className="NavBar" >
        <Navbar.Brand className="m-3" href="/"><img src={img} />Velocida</Navbar.Brand>
        <Nav variant="pills" className="ms-right p-3">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-link" to="/news">News</NavLink>
          <NavLink className="nav-link" to="/forum">Forum</NavLink>
        </Nav>
        <Nav variant="pills" className="ms-auto p-3">
          <NavDropdown title={`Hello, ${currentUser.username}`} id="basic-nav-dropdown" className="dropdown-main">
            <NavDropdown.Item className="dropdown-item" href={`/profile/${currentUser.profile.id}`}>View Profile</NavDropdown.Item>
            <NavDropdown.Item className="dropdown-item" href="/edit_profile">Edit Profile</NavDropdown.Item>
            <NavDropdown.Item className="dropdown-item" href="/create_activity">Log Activity</NavDropdown.Item>
            <NavDropdown.Item className="dropdown-item" href="/running_log">View Running Log</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
    )
  }

  const loggedOutNav = () => {
    return (
      <Navbar className="NavBar">
        <Navbar.Brand className="m-3" href="/"><img src={img} />Velocida</Navbar.Brand>
        <Nav variant="pills" className="ms-right p-3">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/news">News</NavLink>
          <NavLink className="nav-link" to="/forum">Forum</NavLink>
        </Nav>
        <Nav variant="pills" className="ms-auto p-3" activeKey={window.location.pathname}>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/signup">SignUp</NavLink>
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