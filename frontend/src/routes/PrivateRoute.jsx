import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        children 
    )

}

export default PrivateRoute;