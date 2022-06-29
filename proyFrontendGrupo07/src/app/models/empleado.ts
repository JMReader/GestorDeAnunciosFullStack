import { Area } from "./area";
import { Rol } from "./rol";

export class Empleado{
    _id!: string;
    apellido!: string;
    nombre!: string;
    dni!: string;
    email!: string;
    username!: string;
    password!: string;
    legajo!: string;
    esEncargado!: boolean;
    roles!: Array<Rol>;
    area!: Area;
}
