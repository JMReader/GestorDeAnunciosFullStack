import { Area } from "./area";
import { Rol } from "./rol";

export class Persona {
    apellido!: string;
    nombre!: string;
    dni!: string;
    email!: string;
    roles!: Array<Rol>;
    area!: Area;
}
