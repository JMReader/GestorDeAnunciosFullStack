import { Area } from "./area";
import { Empleado } from "./empleado";
import { Medio } from "./medio";
import { Rol } from "./rol";

export class Anuncio {
    _id!: string;
    titulo!: string;
    tvSelected!: boolean;
    fbSelected!: boolean;
    tipo!: string;
    medios!: Array<Medio>;
    fechaCreacion!: string;
    fechaEntrada!: string;
    fechaSalida!: string;
    estado!: string;
    destinatarios!: Array<Rol>;
    recursos!: Array<string>;
    tiempoLectura!: string;
    redactor!: Empleado;
    area!: Area;

    constructor(){
        this.destinatarios = new Array<Rol>();
        this.recursos = new Array<string>();
    }
}

/*Texto anuncio.
2. Tipo contenido (texto plano, imagen, html, video, etc).
3. Medios de publicación: Ej. Facebook, twiter, TV, Email, etc.
4. Fecha de Entrada en vigencia y salida (Valido para publicación en TV.
5. Estado: edición, confeccionado, autorizado, cancelado
6. Destinatarios: uno o más de los role a los que está dirigido el anuncio.
7. Recursos: los anuncios pueden tener asociado información complementaria como ser: pdf, imagen, etc.
que amplié la información del anuncio.
8. Tiempo lectura: corto, medio, largo (es el tiempo que estará en pantalla un anuncio).
9. Redactor: persona que confecciona el anuncio-*/