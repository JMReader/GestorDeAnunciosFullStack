import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio';
import { ElementForList } from '../models/element-for-list';
import { Empleado } from '../models/empleado';
import { Rol } from '../models/rol';
import { EmpleadoService } from './empleado.service';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  url: string = "http://localhost:3000/anuncio"

  constructor(private _http: HttpClient, private rs : RolService, private es: EmpleadoService ) { }


  public async postAnuncio(anuncio: Anuncio,redactor:string, destinatarios:Array<ElementForList>) {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': "http://localhost:4200/",
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({})
    };

    
    var rolesArray = new Array<Rol>();
    var unRol = new Rol;
    destinatarios.forEach(element => {
      //rolesArray.push(element.item_id)
      this.rs.buscarRol(element.item_id).subscribe((result) => {
        unRol = new Rol;
        unRol = result;
        rolesArray.push(unRol);
      });
    });
    anuncio.destinatarios= rolesArray;

    var empleados = new Array<Empleado>();
    this.es.getEmpleado().subscribe((result) => {
  result.forEach((element:any) => {
    empleados.push(element);
  });
    });
    await new Promise(f => setTimeout(f, 50));
  empleados = empleados.filter(o => { return o._id === redactor });
  await new Promise(f => setTimeout(f, 50));
  var unEmpleado = empleados[0];
  anuncio.redactor= unEmpleado;
  console.log(anuncio.redactor);
    let body = JSON.stringify(anuncio);
    //let body = JSON.stringify(anuncio);
    var url = this.url + "/crear";
    
    this._http.post(url, body, httpOptions).subscribe((result) => {
      console.log(result);
      });;
  }


  public deleteAnuncio(anuncio: Anuncio, id: string): Observable<any> {
    this.url = this.url + "/borrar/" + id;
    const httpOptions = {
      headers: new HttpHeaders({ 'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json' }),
      params: new HttpParams({})
    };
    let body = JSON.stringify(anuncio);
    console.log(body);
    return this._http.delete(this.url, httpOptions);
  }

  public updateAnuncio(anuncio: Anuncio, id: string): Observable<any> {
    this.url = this.url + "/modificar";
    const httpOptions = {
      headers: new HttpHeaders({ 'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json' }),
      params: new HttpParams({
      })
    };
    let body = JSON.stringify(anuncio);
    console.log(body);
    return this._http.put(this.url + id, body, httpOptions);
  }


  public getAnuncios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json' }),
      params: new HttpParams({
      })
    };
    var url = this.url + "/obtener";
    return this._http.get(url, httpOptions);
  }

}
