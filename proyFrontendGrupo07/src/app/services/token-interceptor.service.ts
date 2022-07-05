import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  /*Este service interceptará llamadas HTTP desde angular (frontend) a la API(bakcend) y
  agregará a la petición información del token que hemos obtenido en el proceso de login.*/

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeReq = req.clone({
      setHeaders: {
        //asigna la cabecera authorization. ${lo_que_se_retorna} retorna un valor (en este, caso el token, y queda en authorization)
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}