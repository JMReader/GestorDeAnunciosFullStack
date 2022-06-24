import { Area } from "./area";
import { Persona } from "./persona";
import { Rol } from "./rol";

export class Empleado extends Persona{

    usuario!: string;
    contraseña!: string;
    legajo!: string;
    esEncargado!: boolean;
    roles!: Array<Rol>;
    area!: Area;
}
