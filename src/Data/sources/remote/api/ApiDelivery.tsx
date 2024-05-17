import axios from "axios";

import { HOST_LOCAL_ENV, HOST_EMULATOR} from '@env';

const ApiDelivery = axios.create({

<<<<<<< HEAD
    baseURL: 'http://192.168.0.2:3312/api',
=======
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c

    headers: {
        
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }