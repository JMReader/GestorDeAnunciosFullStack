import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  url: string = "http://localhost:3000/anuncio"

  constructor(private _http: HttpClient) { }


  public postAnuncio(anuncio: Anuncio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': "http://localhost:4200/",
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({})
    };
    /*let myJSON = {
      "_id": pasaje._id,
      "precioPasaje": pasaje.precio,
      "categoriaPasajero": pasaje.categoria,
      "fechaCompra": pasaje.fecha,
      "pasajero": {
        "_id": pasaje.pasajero
      }
    };let body = JSON.stringify(myJSON);*/
    let body = JSON.stringify(anuncio);
    this.url = this.url + "/crear";
    
    return this._http.post(this.url, body, httpOptions);
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
