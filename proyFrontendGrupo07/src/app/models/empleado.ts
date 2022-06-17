import { Persona } from "./persona";

export class Empleado extends Persona{

    usuario!: string;
    contraseña!: string;
    legajo!: string;
    esEncargado!: boolean;
}
