import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {
    id?:             string;
    name:            string;
    lastName:        string;
    phone:           string;
    email:           string;
    password:        string;
    confirmPassword?:string;
    image?:          string;
    session_token?:  string;
    rol_id?:         number;
    address?:         Address;
}