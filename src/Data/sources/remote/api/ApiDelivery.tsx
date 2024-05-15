import axios from "axios";

import { HOST_LOCAL, HOST_EMULATOR} from '@env';

const ApiDelivery = axios.create({
    //comment to easy use of the app for me
    baseURL: HOST_EMULATOR,
    //baseURL: 'http://192.168.1.89:3380/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }