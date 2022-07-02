import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Area } from '../models/area';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url: string = 'http://localhost:3000/rol';
  body: string = "";
  constructor(private _http: HttpClient) { }

  getRoles(): Observable<any>{
    var url= this.url + "/obtener"
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    return this._http.get(url,httpOptions);
  }

  buscarRol(id :string): Observable<any>{
    var url= this.url + "/buscar/_id"+id;
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }

    return this._http.get(url,httpOptions);
  }

  postRoles(rol: Rol): Observable<any>{
    var url= this.url + "/crear"
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    this.body = JSON.stringify(rol);
    return this._http.post(url,this.body,httpOptions);
  }
}
