import { defaultConstatnts } from '../constants/defaultConstants';

export const request = async (path: string) => {
    try {
        const response = await fetch(defaultConstatnts.domain + path);

        if (!response.ok) {
            throw response
        }

        const json = response.json();
        return json
    
    } catch (err) {
        console.log('error of request', err)
    }

}
