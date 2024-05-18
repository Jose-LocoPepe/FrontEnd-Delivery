import axios from "axios";

import { HOST_LOCAL, HOST_EMULATOR} from '@env';

const ApiDelivery = axios.create({



    baseURL: 'http://192.168.0.2:3312/api',

  
    headers: {
        
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }