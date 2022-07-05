import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostBase: string;
  constructor(private _http: HttpClient) {
    this.hostBase = "http://localhost:3000/empleado/";
  }

  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }


  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("_id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("area");
    sessionStorage.removeItem("esEncargado");
    sessionStorage.removeItem("token");
  }

  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("username");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  public esEncargado():boolean {
    if (sessionStorage.getItem("esEncargado") != null) {
      if ((sessionStorage.getItem("esEncargado")) == "true") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public userLogged() {
    var usuario = sessionStorage.getItem("username");
    return usuario;
  }

  public idLogged() {
    var id = sessionStorage.getItem("_id");
    return id;
  }

  getToken(): string {
    if (sessionStorage.getItem("token") != null) {
      return sessionStorage.getItem("token")!;
    } else {
      return "";
    }
  }

  // public userRoles(){
  //   var roles = sessionStorage.getItem("roles");
  //   return roles;
  // }

}
