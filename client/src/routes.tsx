import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PhoneCardFull from './components/PhoneCardFull/PhoneCardFull';
import MainPage from './pages/MainPage/MainPage';
import PhonesPage from './pages/PhonesPage/PhonesPage';
import FavoritePage from './pages/FavoritesPage/FavoritePage';
import ChartPage from './pages/CartPage/CartPage';
import TabletsPage from './pages/TabletsPage/TabletsPage';
import TabletCardFull from './components/TabletCardFull/TabletCardFull';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


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
            <Route path="/phone/:model_name" exact>
                <PhoneCardFull/>
            </Route>
            <Route path="/tablet/:model_name" exact>
                <TabletCardFull />
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
