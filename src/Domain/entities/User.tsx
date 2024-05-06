import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {
    id?:             string;
    name:            string;
    lastname:        string;
    phone:           string;
    email:           string;
    password:        string;
    confirmPassword?: string;
    imagen?:          string;
    session_token?:  string;
    rol_id?:        Rol[];
    //address:         Address;
}