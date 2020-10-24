import { useState, useCallback, useEffect, FC } from 'react';
import { request } from '../api/request';

// interface useHTTPInterface {
//     path: string
// }

export const useHTTP = ()=> {
    const [loading, setLoading] = useState<null | boolean>(null);
    const [error, setError] = useState<any>(null);
    const [response, setResponse] = useState(null)

    const getReguest = useCallback(async (path: string) => {
        console.log('request');
        
        setLoading(true)
        try {
            const response = await request(path);
            return response
            // setResponse(response)
            
        } catch (err) {
            console.log('error in HTTP hook', err);
            setError(err)
        } finally {
            setLoading(false)
        }
    },[])

    const cleanError = () => {
        setError(null)
    }

    return {getReguest, loading, error, cleanError}
}
