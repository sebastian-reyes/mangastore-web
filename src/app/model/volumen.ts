import { Manga } from "./manga";

export class Volumen {
    id_volumen: number;
    nombre_volumen: string;
    descripcion: string;
    n_tomo: number;
    ISBN: string;
    precio: number;
    stock_act: number;
    stock_min: number;
    url: string;
    foto: string;
    manga: Manga;
}
