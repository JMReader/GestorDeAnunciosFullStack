import { Area } from "./area";
import { Rol } from "./rol";

<<<<<<< Updated upstream
export class Empleado extends Persona{

    usuario!: string;
    contraseña!: string;
=======
export class Empleado{
    _id!: string;
    apellido!: string;
    nombre!: string;
    dni!: string;
    email!: string;
    username!: string;
    password!: string;
>>>>>>> Stashed changes
    legajo!: string;
    esEncargado!: boolean;
    roles!: Array<Rol>;
    area!: Area;
}
