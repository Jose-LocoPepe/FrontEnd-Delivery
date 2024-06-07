import axios from "axios";

import { HOST_LOCAL, HOST_EMULATOR} from '@env';

const ApiDelivery = axios.create({
    baseURL: 'http://172.20.10.3:3307/api',
    headers: {
        
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }