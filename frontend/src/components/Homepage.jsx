import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../UserContext";

const Homepage = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Velocida</h1>
                <p className="lead">Your go to social site for running news and activity logging! </p>
                {currentUser
                    ? <><h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    <p>
                        <Link className="btn btn-primary font-weight-bold m-2"
                            to="/companies">
                            Companies
                        </Link>
                        <Link className="btn btn-primary font-weight-bold m-2"
                            to="/jobs">
                            Jobs
                        </Link>
                    </p>
                    </>
                    : (
                        <p>
                            <Link className="btn btn-primary font-weight-bold m-2"
                                to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-primary font-weight-bold m-2"
                                to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    )
}

export default Homepage;