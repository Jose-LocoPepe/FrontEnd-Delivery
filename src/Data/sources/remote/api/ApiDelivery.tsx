import axios from "axios";

import { HOST_LOCAL_ENV } from '@env';

const ApiDelivery = axios.create({
    baseURL: HOST_LOCAL_ENV,
    headers: {
        'Content-Type': 'application/json',
    }
});


export { ApiDelivery }