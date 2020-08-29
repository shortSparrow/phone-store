import { createContext } from 'react';

interface authInterface {
    userId: null,
    token: null,
    login: (token: string | null, userId: string | null) => void,
    logout: () => void,
    isAuthentificated: boolean
}

export const AuthContext = createContext<Partial<authInterface>>({
    userId: null,
    token: null,
    login: () => {},
    logout: () => {},
    isAuthentificated: false
})