import { Area } from "./area";

export class Rol {
    _id!: string;
    nombreRol!: string;
    areaAsignada!: Area;
    constructor(){
        this.areaAsignada = new Area();
    }
}
