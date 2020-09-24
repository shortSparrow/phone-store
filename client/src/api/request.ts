import { defaultConstatnts } from '../constants/defaultConstants';

export const request = async (path: string) => {
    try {
        const response = await fetch(defaultConstatnts.domain + path);

        if (!response.ok) {
            throw response
        }

        const json = await response.json();
        return json
    
    } catch (err) {
        console.log('error of request', err)
    }

}

export const postRequest = async (path: string, data: any) => {
    try {
        const response = await fetch(defaultConstatnts.domain + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw response
        }

        const json = await response.json();
        return json
    
    } catch (err) {
        console.log('error of post request', err)
    }

}