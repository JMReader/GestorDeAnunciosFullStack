import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medio } from '../models/medio';

@Injectable({
  providedIn: 'root'
})
export class MedioService {
  url: string = 'http://localhost:3000/medio';
  body: string = "";
  constructor(private _http: HttpClient) { }

  getMedios(): Observable<any>{
    var url= this.url + "/obtener"
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    }
    return this._http.get(url,httpOptions);
  }

  pushMedio(medio: Medio): Observable<any>{
    var url= this.url + "/crear"
    
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    };

    let body = JSON.stringify(medio);

    console.log(body);

    return this._http.post(url, body ,httpOptions);
  }
}
