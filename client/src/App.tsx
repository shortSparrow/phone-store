import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { useRoutes } from './routes';
import './App.scss';

import store from './store';
import { setDeviceScreen, loadDevicesCount } from './store/actions/appState';
import { setFavoriteDevices } from './store/actions/favoritesDevice';
import { setCartDeviceList } from './store/actions/cartDeviceList';

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
    store.dispatch(loadDevicesCount())

    // add favoriteDevice from localStorage to redux
    const favoriteDeviceLocalList = localStorage.getItem('@favotiteDeviceList') || JSON.stringify([]);
    store.dispatch(setFavoriteDevices(JSON.parse(favoriteDeviceLocalList!)));

    // add chartDeviceList from localStorage to redux
    const cartDeviceLocalList = localStorage.getItem('@cartDeviceList') || JSON.stringify([]);

    store.dispatch(setCartDeviceList(JSON.parse(cartDeviceLocalList!)));

    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    }
  }, [])

  return (
    <Provider store={store}>
        <div className="app">
          <HashRouter>
            {routes}
          </HashRouter>
        </div>
    </Provider>
  )
}

export default App;
