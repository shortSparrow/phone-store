

import { useState, useCallback, useEffect, FC } from 'react';
import { request } from '../api/request';
import { defaultConstatnts } from '../constants/defaultConstants';

interface useHTTPInterface {
    path: string
}

export const useHTTP = ()=> {
    const [loading, setLoading] = useState<null | boolean>(null);
    const [error, setError] = useState<any>(null);
    const [response, setResponse] = useState(null);
    const [data, setData] = useState(null)


    const getReguest = useCallback(async (path: string) => {
        // console.log('request');

        setLoading(true)
        try {
            const response = await request(path);
            setData(response)
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

    return {getReguest, loading, error, data, cleanError}
}


// export const useFetch = (url: string, options: any) => {
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 const res = await fetch(defaultConstatnts.domain + url);
//                 const json = await res.json();
//                 setResponse(json);
//                 setIsLoading(false)
//             } catch (error) {
//                 setError(error);
//             }
//         };
//         fetchData();
//     }, []);
//     return { response, error, isLoading };
// };