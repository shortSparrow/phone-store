import React from 'react';
import { useAuth } from '../hooks/auth.hook';

const MainPage = () => {
    const {logout} = useAuth();

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <h1>Main Page!</h1>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default MainPage