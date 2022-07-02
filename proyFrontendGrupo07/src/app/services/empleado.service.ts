import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio';
import { Area } from '../models/area';
import { ElementForList } from '../models/element-for-list';
import { Empleado } from '../models/empleado';
import { Rol } from '../models/rol';
import { AreaService } from './area.service';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  url: string = 'http://localhost:3000/empleado';
  areas: Array<Area> = new  Array<Area>();
  body: string = "";
  constructor(private _http: HttpClient, private rs: RolService, private as : AreaService) { }

  public async guardarEmpleado(apellido: string, nombre: string, dni : string, email : string, username : string, password : string, legajo : string, area : string, roles: Array<ElementForList>) {
    var areaAux = new Area();
    this.areas = new Array<Area>();

    this.as.getArea().subscribe((result) => {
      result.forEach((element :any) => {  
        if(element._id === area)
        {
        areaAux=element;
        }
      });
    });
    

    var url= this.url+ "/crear"
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    var rolesArray = new Array<Rol>();
    var unRol = new Rol;
    roles.forEach(element => {
      //rolesArray.push(element.item_id)
      this.rs.buscarRol(element.item_id).subscribe((result) => {
        unRol = new Rol;
        unRol = result;
        rolesArray.push(unRol);
      });
    });

    var empleado = new Empleado();
    empleado.apellido = apellido;
    empleado.nombre = nombre;
    empleado.dni = dni;
    empleado.email = email;
    empleado.username = username;
    empleado.password = password;
    empleado.legajo = legajo;
    empleado.esEncargado = true;
    empleado.roles = rolesArray;
    await new Promise(f => setTimeout(f, 60));
    empleado.area = areaAux;
    this.body = JSON.stringify(empleado);
    
    this._http.post(url, this.body, httpOptions).subscribe((result) => {
    console.log(result);
    });
   }

   public getEmpleado(): Observable<any> {
    var url= this.url + "/obtener"
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    return this._http.get(url,httpOptions);
  }

}
