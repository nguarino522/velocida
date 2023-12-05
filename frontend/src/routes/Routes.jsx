import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import PrivateRoute from "./PrivateRoute"
import Homepage from "../components/Homepage"
import News from "../components/News"
import Forum from "../components/Forum"
import Dashboard from "../components/Dashboard"
import ProfileForm from "../components/ProfileForm";
import ProfileView from "../components/ProfileView"

const Routing = ({ login, signup, handleToastClose, showToast }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/news" element={<News />} />
                <Route path="/forum" element={<Forum />} />
                {/* <Route path="/forum" element={<PrivateRoute><CompanyList /></PrivateRoute>} /> */}
                <Route path="/edit_profile" element={<PrivateRoute><ProfileForm handleToastClose={handleToastClose} showToast={showToast} /></PrivateRoute>}/>
                <Route path="/profile/:id" element={<ProfileView />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </div>
    )
}

export default Routing;