import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/authContext';
import './App.css';




function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthentificated = !!token;
  const routes = useRoutes(isAuthentificated)

  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthentificated}}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
