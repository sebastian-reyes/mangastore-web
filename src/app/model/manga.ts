import { Autor } from "./autor";
import { Demografia } from "./demografia";

export class Manga {
    id_manga: number;
    nombre_manga: string;
    sinopsis: string;
    foto: string;
    autor: Autor;
    genero: Demografia;
}
