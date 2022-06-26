import { Empleado } from "./empleado";

export class Anuncio {
    texto!: string;
    tipo!: string;
    medio!: Array<string>;
    fechaEntrada!: string;
    fechaSalida!: string;
    estado!: string;
    destinatarios!: Array<string>;
    recurso!: string;
    tiempoLectura!: string;
    redactor!: Empleado;

    constructor(){
        this.destinatarios = new Array<string>();
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