import { Rol } from "./rol";

export class UsuarioRequest {
    id_usuario = 0;
    nombres:string;
    apellidos: string;
    email: string;
    password: string;
    telefono: string;
    activo: boolean = true;
    rol: Rol;
}
