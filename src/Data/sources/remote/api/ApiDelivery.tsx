import axios from "axios";

import { HOST_LOCAL_ENV, HOST_EMULATOR} from '@env';

const ApiDelivery = axios.create({

    headers: {
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }