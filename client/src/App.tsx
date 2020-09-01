import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import './App.scss';

function App() {
  const routes = useRoutes(false)

  return (
    <div className="app">
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </div>
  )
}

export default App;
