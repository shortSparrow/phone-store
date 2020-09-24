import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PhoneCardFull from './components/PhoneCardFull/PhoneCardFull';
import MainPage from './pages/MainPage/MainPage';

export const useRoutes = (isAuthentificated: boolean) => {

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Route path="/phone/:model_name" exact>
                <PhoneCardFull/>
            </Route>
        </Switch>
    )
}
