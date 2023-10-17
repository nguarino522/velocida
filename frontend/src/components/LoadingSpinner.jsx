import React from "react";
import "./LoadingSpinner.css";
import Spinner from 'react-bootstrap/Spinner';

/** Loading message used by components that fetch API data. */

const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      Loading... <br />
      <Spinner></Spinner>
    </div>
  );
}

export default LoadingSpinner;