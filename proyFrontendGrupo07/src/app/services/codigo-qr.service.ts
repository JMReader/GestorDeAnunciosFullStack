import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodigoQrService {

  constructor(private _http:HttpClient) { }

  public getCodigo(text:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host': 'codzz-qr-cods.p.rapidapi.com',
        'X-RapidAPI-Key': 'f1447bf366msh78719d2e5b4bdccp1566f2jsnbfa83a614060'
      })
    }

    return this._http.get("https://codzz-qr-cods.p.rapidapi.com/getQrcode?type=url&value="+"https://localhost:4200/anuncios/descripcion?id="+text,httpOptions)
  }
}
