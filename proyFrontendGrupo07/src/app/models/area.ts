import { Empleado } from "./empleado";

export class Area {
    _id!: string;
    nombreArea!: string;
    encargado!: Array<Empleado>;
}
