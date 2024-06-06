export interface ResponseAPIDelivery {
    success?: boolean;
    message?: string;
    data?: any;
    errors?: Error[];
    error?: string;
    image1?: string;
    image2?: string;
    image3?: string;
}

export interface Error {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}