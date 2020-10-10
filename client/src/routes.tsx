import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PhoneCardFull from './components/PhoneCardFull/PhoneCardFull';
import MainPage from './pages/MainPage/MainPage';
import PhonesPage from './pages/PhonesPage/PhonesPage';

export const useRoutes = (isAuthentificated: boolean) => {

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Route path="/phones" exact>
                <PhonesPage />
            </Route>
            <Route path="/phone/:model_name" exact>
                <PhoneCardFull/>
            </Route>
        </Switch>
    )
}
