import axios from "axios";

import { HOST_LOCAL_ENV } from '@env';

const ApiDelivery = axios.create({
    baseURL: 'http://172.16.0.163:3307/api',
    headers: {
        'Content-Type': 'application/json',
    }
});


export { ApiDelivery }