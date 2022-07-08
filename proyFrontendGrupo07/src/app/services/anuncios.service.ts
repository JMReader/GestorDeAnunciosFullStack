import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio';
import { Area } from '../models/area';
import { ElementForList } from '../models/element-for-list';
import { Empleado } from '../models/empleado';
import { Medio } from '../models/medio';
import { Rol } from '../models/rol';
import { AreaService } from './area.service';
import { EmpleadoService } from './empleado.service';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root',
})
export class AnunciosService {
  url: string = 'http://localhost:3000/anuncio';

  constructor(
    private _http: HttpClient,
    private rs: RolService,
    private es: EmpleadoService,
    private as: AreaService
  ) { }

  public async postAnuncio(
    anuncio: Anuncio,
    redactor: string,
    destinatarios: Array<ElementForList>,
    area: string
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };

    var rolesArray = new Array<Rol>();
    var unRol = new Rol();
    destinatarios.forEach((element) => {
      //rolesArray.push(element.item_id)
      this.rs.buscarRol(element.item_id).subscribe((result) => {
        unRol = new Rol();
        unRol = result;
        rolesArray.push(unRol);
      });
    });
    anuncio.destinatarios = rolesArray;

    var redactorAux = new Empleado();
    this.es.getEmpleado().subscribe((result) => {
      result.forEach((element: any) => {
        if (element._id === redactor) {
          redactorAux = element;
        }
      });
    });


    await new Promise(f => setTimeout(f, 90));
    anuncio.redactor = redactorAux;
    console.log(redactorAux)
    console.log(anuncio.redactor);
    console.log("El anuncio: ");
    console.log(anuncio);
    await new Promise(f => setTimeout(f, 60));
    var areaAux = new Area();
    this.as.getArea().subscribe(
      (result) => {
        result.forEach((element: any) => {
          if (element._id === area) {
            areaAux = element;
          }
        });
      }
    )

    await new Promise(f => setTimeout(f, 60));
    anuncio.area = areaAux;
    console.log('area obtenida service', areaAux)
    console.log('area obtenida service', anuncio.area);
    await new Promise(f => setTimeout(f, 60));
    let body = JSON.stringify(anuncio);
    //let body = JSON.stringify(anuncio);
    var url = this.url + '/crear';

    this._http.post(url, body, httpOptions).subscribe((result) => {
      console.log(result);
    });
  }

  public deleteAnuncio(anuncio: Anuncio, id: string): Observable<any> {
    this.url = this.url + '/borrar/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    let body = JSON.stringify(anuncio);
    console.log(body);
    return this._http.delete(this.url, httpOptions);
  }

  public updateAnuncio(anuncio: Anuncio, id: string): Observable<any> {
    var url = this.url + "/actualizar/";
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    let body = JSON.stringify(anuncio);
    console.log(body);
    return this._http.put(url + id, body, httpOptions);
  }

  public getAnuncios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/obtener';
    return this._http.get(url, httpOptions);
  }
  public getFiltroEstado(estado: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/filtro/estado/';
    return this._http.get(url + estado, httpOptions);
  }
  public getFiltrotxt(texto: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/filtro/txt/';
    return this._http.get(url + texto, httpOptions);
  }
  public getFiltrofechas(desde: string, hasta: string): Observable<any> {
    const options = {
      method: 'GET',
      params: {
        "desde": desde,
        "hasta": hasta
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    var url = this.url + '/filtro/fechas'
    return this._http.get(url, options)
  }

  public getSuperFiltrar(filtros:Array<string>,desde:string, hasta:string, medio:string,titulo:string,tipo:string,estado:string,redactor:string,destinatario:string): Observable<any> {
    const options = {
      method: 'GET',
      params: {
        "filtros":filtros,
        "desde": desde,
        "hasta": hasta,
        "medio": medio,
        "titulo": titulo,
        "tipo": tipo,
        "estado": estado,
        "redactor": redactor,
        "destinatario": destinatario
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    var url = this.url + '/omegafiltro/'
    return this._http.get(url, options)
  }

  public getFiltroRedactor(RedactorID: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/filtro/redactor/';
    return this._http.get(url + RedactorID, httpOptions);
  }

  public getFiltroDestinatario(DestinatarioID: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/filtro/destinatario/';
    return this._http.get(url + DestinatarioID, httpOptions);
  }
  public getFiltroMedio(medio: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/filtro/medio/';
    return this._http.get(url + medio, httpOptions);
  }
  public getFiltroTipoContenido(tipo: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/filtro/tipo/';
    return this._http.get(url + tipo, httpOptions);
  }

  public getFiltroArea(AreaID: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': 'http://localhost:4200/',
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
    var url = this.url + '/filtro/area/';
    return this._http.get(url + AreaID, httpOptions);
  }


}
