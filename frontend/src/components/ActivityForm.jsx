import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import VelocidaApi from '../VelocidaApi';

const ActivityForm = ({ showToast }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration_hours: 0,
        duration_minutes: 0,
        duration_seconds: 0,
        distance: 0,
        ownerId: currentUser.profile.id
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const duration = Number(formData.duration_seconds) + (Number(formData.duration_minutes) * 60) + ((Number(formData.duration_hours) * 60) * 60)
            const activityData = {
                title: formData.title,
                description: formData.description,
                duration: duration,
                distance: Number(formData.distance),
                ownerId: formData.ownerId
            }
            const newActivity = await VelocidaApi.createActivity(activityData)
            showToast("success", "Activity successfully created.")
            setFormData(f => ({ ...f, password: "" }));
            setFormErrors([]);
            navigate(`/activity/${newActivity.id}`);
        } catch (errors) {
            setFormErrors(errors);
            showToast("error", { formErrors });
            return;
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body formbackground">
                    <h2 className="mb-4 text-center">Create Activity:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title:
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description:
                            </label>
                            <textarea
                                required
                                className="form-control"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 d-flex justify-content-center align-items-center">
                            <label htmlFor="duration" className="form-label m-2">
                                Duration/Time:
                            </label>
                            <input
                                required
                                type="number"
                                className="form-control m-1"
                                id="duration_hours"
                                name="duration_hours"
                                min="0"
                                value={formData.duration_hours}
                                onChange={handleChange}
                                style={{ width: "100px" }}
                            />
                            <span className="m-1">:</span>
                            <input
                                required
                                type="number"
                                className="form-control m-1"
                                id="duration_minutes"
                                name="duration_minutes"
                                max="59"
                                min="0"
                                value={formData.duration_minutes}
                                onChange={handleChange}
                                style={{ width: "100px" }}
                            />
                            <span className="m-1">:</span>
                            <input
                                required
                                type="number"
                                step="0.01"
                                className="form-control m-1"
                                id="duration_seconds"
                                name="duration_seconds"
                                max="59.99"
                                min="0"
                                value={formData.duration_seconds}
                                onChange={handleChange}
                                style={{ width: "100px" }}
                            />
                        </div>
                        <div className="mb-3 d-flex justify-content-center">
                            <label htmlFor="distance" className="form-label m-2">
                                Distance (in miles):
                            </label>
                            <input
                                step="0.01"
                                type="number"
                                className="form-control"
                                id="distance"
                                name="distance"
                                value={formData.distance}
                                onChange={handleChange}
                                style={{ width: "120px" }}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-custom btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ActivityForm