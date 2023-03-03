import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import PhoneCardFull from './components/PhoneCardFull/PhoneCardFull';
import MainPage from './pages/MainPage/MainPage';
import PhonesPage from './pages/PhonesPage/PhonesPage';
import FavoritePage from './pages/FavoritesPage/FavoritePage';
import ChartPage from './pages/CartPage/CartPage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
// import TabletCardFull from './components/TabletCardFull/TabletCardFull';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
// import AccessoriesFullCard from './components/AccessoriesFullCard/AccessoriesFullCard';
import DeviceFullCard from './components/DeviceFullCard/DeviceFullCard';


export const useRoutes = (isAuthentificated: boolean) => {

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Route path="/phones" exact>
                <PhonesPage />
            </Route>
            <Route path="/tablets" exact>
                <TabletsPage />
            </Route>

            <Route path="/accessories" exact>
                <AccessoriesPage />
            </Route>

            <Route path="/phone/:model_name" exact>
                {/* <PhoneCardFull /> */}
                <DeviceFullCard />
            </Route>
            <Route path="/tablet/:model_name" exact>
                {/* <TabletCardFull /> */}
                <DeviceFullCard />
            </Route>

            <Route path="/accessories/:model_name" exact>
                {/* <AccessoriesFullCard /> */}
                <DeviceFullCard />
            </Route>
            <Route path="/favorites" exact>
                <FavoritePage />
            </Route>

            <Route path="/cart" exact>
                <ChartPage />
            </Route>

            <Route>
                <NotFoundPage />
            </Route>
        </Switch>
    )
}
