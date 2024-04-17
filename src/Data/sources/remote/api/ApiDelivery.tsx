import axios from "axios";

//Emulador ANDROID URL : HTTP://10.0.2.2

const ApiDelivery = axios.create({
    baseURL: 'http://192.168.0.29:3307/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery }