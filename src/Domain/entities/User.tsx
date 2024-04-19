import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {
    id?:             string;
    name:            string;
    lastname:        string;
    phone:           string;
    email:           string;
<<<<<<< HEAD
    image?:          string;
    password:        string;
    confirmPassword: string;
    session_token?:  string;
    role_id?:        Rol[];
=======
    password:        string;
    confirmPassword: string;
    image?:          string;
    session_token?:  string;
    rol_id?:        Rol[];
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
    //address:         Address;
}