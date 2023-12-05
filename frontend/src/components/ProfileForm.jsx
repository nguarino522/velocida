import React, { useState, useContext } from "react";
import Alert from "./Alert";
import UserContext from "../UserContext";
import VelocidaApi from '../VelocidaApi';
import ToastComponent from "./ToastComponent";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({ showToast }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: currentUser.profile.firstName,
        lastName: currentUser.profile.lastName,
        bio: currentUser.profile.bio,
        username: currentUser.username,
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            await VelocidaApi.login({ username: currentUser.username, password: formData.password })
        } catch (error) {
            showToast("error", error)
            return;
        }

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            bio: formData.bio
        };

        let username = formData.username;
        let updatedProfile;
        let updatedUser;

        try {
            updatedProfile = await VelocidaApi.saveProfile(currentUser.profile.id, profileData);
            updatedUser = await VelocidaApi.getCurrentUser(username);
            showToast("success", "Updated successfully.")
        } catch (errors) {
            setFormErrors(errors);
            showToast("error", { formErrors });
            return;
        }

        setFormData(f => ({ ...f, password: "" }));
        setFormErrors([]);
        setCurrentUser(updatedUser);
        navigate(`/profile/${currentUser.profile.id}`);
    }


    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
        setFormErrors([]);
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group m-2">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formData.username}</p>
                        </div>
                        <div className="form-group m-2">
                            <label>First Name:</label>
                            <input
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group m-2">
                            <label>Last Name:</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group m-2">
                            <label>Bio:</label>
                            <textarea
                                name="bio"
                                className="form-control"
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group m-2">
                            <label>Enter password to confirm:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-custom btn-block mt-4"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default ProfileForm;