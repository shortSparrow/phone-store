import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = (isAuthentificated:boolean)=> {
    if (isAuthentificated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                {/* Other Pages */}
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/> 
            {/* Если попали на несуществующюю страницу */}
        </Switch>
    )
}
