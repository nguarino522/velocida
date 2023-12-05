import { useState, useEffect, useCallback } from 'react'
import LoadingSpinner from './components/LoadingSpinner';
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from './components/NavBar';
import UserContext from './UserContext';
import { BrowserRouter } from "react-router-dom";
import Routing from './routes/Routes';
import './App.css'
import jwt from "jsonwebtoken";
import VelocidaApi from './VelocidaApi';
import ToastComponent from './components/ToastComponent';
import { Button } from 'react-bootstrap';
import Background from './components/Background';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          VelocidaApi.token = token;
          let currentUser = await VelocidaApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("Problem loading user information", err);
          setCurrentUser(null);
        }
      } setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const login = async (loginData) => {
    try {
      let token = await VelocidaApi.login(loginData);
      setToken(token);
      showToast("success", "Successfully logged in.")
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      showToast("error", "ERROR: Failed to login.")
      return { success: false, errors };
    }
  }

  const signup = async (signupData) => {
    try {
      let token = await VelocidaApi.signup(signupData);
      setToken(token);
      showToast("success", "Successfully created account.")
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      showToast("error", "ERROR: Failed to create account.")
      return { success: false, errors };
    }
  }

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  const handleToastClose = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  const showToast = (type, message) => {
    const newToast = {
      id: new Date().getTime(),
      type,
      message,
    }
    console.log(newToast)
    setToasts((toasts) => [...toasts, newToast]);
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <>
    <Background />
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout} />
          <div className="m-5 fading-in">
            <ToastComponent toasts={toasts} handleToastClose={handleToastClose} />
            {/* <Button className="btn-custom" onClick={() => showToast("its working... its working!")}>Show Toast</Button> */}
            <Routing login={login} signup={signup} handleToastClose={handleToastClose} showToast={showToast}/>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
