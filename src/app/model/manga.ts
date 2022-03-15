import { Autor } from "./autor";
import { Demografia } from "./demografia";
import { Editorial } from "./editorial";

export class Manga {
    id_manga: number;
    nombre_manga: string;
    sinopsis: string;
    foto: string;
    numero_volumenes: number;
    autor: Autor;
    url: string;
    genero: Demografia;
    editorial: Editorial;
}
