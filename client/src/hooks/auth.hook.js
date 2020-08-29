import { useState, useCallback, useEffect } from 'react';

const storageToken = 'userToken';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id);

        localStorage.setItem(storageToken, JSON.stringify({
            userId: id,
            token: jwtToken
        }))

    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null);
        localStorage.removeItem(storageToken)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageToken));
        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return { login, logout, token, userId }
}