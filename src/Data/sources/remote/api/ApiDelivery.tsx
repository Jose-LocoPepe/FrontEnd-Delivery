import axios from "axios";

import { HOST_LOCAL, HOST_EMULATOR} from '@env';

const ApiDelivery = axios.create({


    baseURL: 'http://192.168.137.252:3307/api',


    headers: {
        
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }