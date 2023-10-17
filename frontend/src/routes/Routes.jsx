import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import PrivateRoute from "./PrivateRoute"
import Homepage from "../components/Homepage"


const Routing = ({ login, signup }) => {
    return (
        <div>
            <Routes>
                <Route path="/"  element={<Homepage />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/news" />
                {/* <Route path="/forum" element={<PrivateRoute><CompanyList /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><ProfileForm /></PrivateRoute>}/> */}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </div>
    )
}

export default Routing;