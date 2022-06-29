import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  url:string="http://localhost:3000/anuncio"

  constructor(private _http: HttpClient) { }


  public postAnuncio(anuncio:Anuncio):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
        params: new HttpParams({})
      };
      let body = JSON.stringify(anuncio);
      this.url=this.url+"/crear";
      console.log(body);
      return this._http.post(this.url,body, httpOptions);
  }


  public deleteAnuncio(anuncio:Anuncio, id:string):Observable<any>{
    this.url = this.url+"/borrar/"+id;
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({})
    };
    let body = JSON.stringify(anuncio);
    console.log(body);
    return this._http.delete(this.url, httpOptions);
  }
  
  public updateAnuncio(anuncio: Anuncio, id: string):Observable<any>{
    this.url = this.url+"/modificar";
    const httpOptions = {
      headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}),
      params: new HttpParams({
      })
    };
    let body = JSON.stringify(anuncio);
    //??????????? no es mas facil meter el id en la url? xd
    body = body+ "'_id': id";
    console.log(body);
    return this._http.put(this.url, body,httpOptions);
  }
<<<<<<< Updated upstream
=======


  public getAnuncios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json' }),
      params: new HttpParams({
      })
    };
    this.url = this.url + "/obtener";
    return this._http.get(this.url, httpOptions);
  }

>>>>>>> Stashed changes
}
