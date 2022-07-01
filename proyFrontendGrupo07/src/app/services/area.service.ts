import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  url: string = 'http://localhost:3000/area';
  constructor(private _http: HttpClient) { }



  public guardarArea(area: Area): Observable<any> {
    var url= this.url+ "/crear"
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    let body = JSON.stringify(area);
    console.log(body);
    return this._http.post(url, body,httpOptions);
   }

  public getArea(): Observable<any> {
    var url= this.url + "/obtener"
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    return this._http.get(url,httpOptions);
  }


  public actualizarArea(id: string, ar: Area): Observable<any>{
    var url= this.url + "/actualizar/" + id ;
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    let body = JSON.stringify(ar);
    return this._http.put(url,body,httpOptions);
  }
}
