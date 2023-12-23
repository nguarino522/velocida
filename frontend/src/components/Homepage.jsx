import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../UserContext";

const Homepage = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="Homepage fading-in">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Velocida</h1>
                <p className="lead">Your go to social site for running news and activity logging!</p>
                {currentUser
                    ? <><h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                        <p>
                            <Link className="btn btn-success btn-custom font-weight-bold m-2"
                                to="/news">
                                News
                            </Link>
                            <Link className="btn btn-success btn-custom font-weight-bold m-2"
                                to="/dashboard">
                                Dashboard
                            </Link>
                            <Link className="btn btn-success btn-custom font-weight-bold m-2"
                                to="/forum/1">
                                Forum
                            </Link>
                        </p>
                    </>
                    : (
                        <p>
                            <Link className="btn btn-success btn-custom font-weight-bold m-2"
                                to="/login" style={{ backgroundColor: "pink" }}>
                                Log In
                            </Link>
                            <Link className="btn btn-success btn-custom font-weight-bold m-2"
                                to="/signup">
                                Sign Up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    )
}

export default Homepage;