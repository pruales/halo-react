import axios from 'axios';
import { getAccessToken } from './auth';

export const fetchCollection = async () => {
    const token = getAccessToken();
    const request = axios.get('https://17caf9f8.ngrok.io/getAll', {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    });

    return request;
}

export const addItem = async (item) => {
    const token = getAccessToken();
    const request = axios.post('https://17caf9f8.ngrok.io/set', item, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })

    return request
}