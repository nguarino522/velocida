import { useState, useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner';
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from './components/NavBar';
import UserContext from './UserContext';
import { BrowserRouter } from "react-router-dom";
import Routing from './routes/Routes';
import './App.css'
import jwt from "jsonwebtoken";
import VelocidaApi from './VelocidaApi';
import Particles from "react-tsparticles";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);

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
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  const signup = async (signupData) => {
    try {
      let token = await VelocidaApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout} />
          <div className="m-5 fading-in">
            <Routing login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
