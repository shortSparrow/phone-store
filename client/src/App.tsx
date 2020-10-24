import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { useRoutes } from './routes';
import './App.scss';

import store from './store';
import { setDeviceScreen } from './store/actions/appState';
import { setFavoriteDevices } from './store/actions/favoritesDevice';


function App() {
  const routes = useRoutes(false);

  // check device screen width
  const checkDeviceSize = (event?: any) => {
    const screenWidth = event ? event.currentTarget.innerWidth : window.innerWidth;

    store.dispatch(setDeviceScreen({
      value: screenWidth,
      name: screenWidth > 0 && screenWidth <= 500
        ? 'phone'
        : screenWidth > 500 && screenWidth <= 900 
        ? 'tablet'
        : 'desktop'
    }))
  }

  useEffect(() => {
    window.addEventListener('resize', checkDeviceSize);
    checkDeviceSize();

    // add favoriteDevice from localStorage to redux
    const favoriteDeviceLocalList = localStorage.getItem('@favotiteDeviceList');
    store.dispatch(setFavoriteDevices(JSON.parse(favoriteDeviceLocalList!)));

    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    }
  }, [])

  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App;
