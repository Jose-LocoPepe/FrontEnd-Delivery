import axios from "axios";

import { HOST_LOCAL, HOST_EMULATOR} from '@env';
//Emulador ANDROID URL : HTTP://10.0.2.2
//    baseURL: 'http://192.168.0.29:3307/api',

const ApiDelivery = axios.create({
    baseURL: HOST_EMULATOR,
    //baseURL: 'http://192.168.0.11:3307/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }