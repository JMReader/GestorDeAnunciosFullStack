import { Area } from "./area";
import { Persona } from "./persona";
import { Rol } from "./rol";

export class Empleado extends Persona{
    
    _id!: string;
    username!: string;
    password!: string;
    legajo!: string;
    esEncargado!: boolean;
    roles!: Array<Rol>;
    area!: Area;
}
