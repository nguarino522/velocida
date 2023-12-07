import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Alert from "./Alert";

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let res = await login(formData);
    if (res.success) {
      navigate("/")
    } else {
      setFormErrors(res.errors);
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm fading-in">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
        <div className="card">
          <div className="card-body formbackground">
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group m-2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

              <button
                className="btn btn-primary btn-custom float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;