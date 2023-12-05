import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Alert from "./Alert";

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    age: null
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let res = await signup(formData);
    if (res.success) {
      navigate("/")
    } else {
      setFormErrors(res.errors);
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm fading-in">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2">
                <label>Username:</label>
                <input
                  required
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group m-2">
                <label>Password:</label>
                <input
                  required
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
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
                <label>Email:</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
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
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  min="0" data-bind="value:replyNumber"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
              }

              <button
                type="submit"
                className="btn btn-primary btn-custom float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <p>NOTE: Only username, password, and email are required to sign up.</p>
      </div>
    </div>
  )
}

export default SignupForm;