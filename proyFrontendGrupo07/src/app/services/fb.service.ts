import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';

@Injectable({
  providedIn: 'root'
})
export class FbService {
//service realizado para postear unicamente llamar a la funcion "postearFB" e inicializar en el constructor "this.iniciarFb()"

  constructor(private fb: FacebookService, private _http: HttpClient) { }



  iniciarFb() {
    let initParams: InitParams = {
      appId: '437611661543922',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0',
       status: true,
       cookie: true,
      // version: 'v2.4'
    };
    this.fb.init(initParams);
  }
  
  postearFb(mensaje: string) {
 
    this.iniciarFb();
    var apiMethod: ApiMethod = "post";
    this.fb.api('/110966101664631/feed', apiMethod,
      {
        "message": mensaje,
        "access_token":"EAAGOAWeiyfIBADc2mBJUmgi48dEJ5VZAMF5DsmIQm3nfLZApuiPs2HZBH5hquA6zZBaXQ5dZCi3ohjsprFZA3UsAy5ZCe9Pq345d6c04cCKYB5KVa5N6wZA8qLSvhpbqWXjTsb5zwhxTmj1mVZA1hGISY42ywEK3jYQTCdhSGsTPDFJ1GS5XLYOFfLOqHFmqEZBsSaWGm6TjuChgZDZD"
      }

    )
  }

  postearImgFb(url: string, descripcion:string) {
    
    this.iniciarFb();
    var apiMethod: ApiMethod = "post";
    this.fb.api('/110966101664631/photos', apiMethod,
      {
        "name": descripcion, //puede ser opcional solo subir la imagen o agrgarle una descripcion
        "url": url,
        "access_token":"EAAGOAWeiyfIBADc2mBJUmgi48dEJ5VZAMF5DsmIQm3nfLZApuiPs2HZBH5hquA6zZBaXQ5dZCi3ohjsprFZA3UsAy5ZCe9Pq345d6c04cCKYB5KVa5N6wZA8qLSvhpbqWXjTsb5zwhxTmj1mVZA1hGISY42ywEK3jYQTCdhSGsTPDFJ1GS5XLYOFfLOqHFmqEZBsSaWGm6TjuChgZDZD"
      }

    )
  }

  loginWithFacebook(): void {
    this.fb.login()
      .then((response: LoginResponse) => {
        console.log('Logged in', response);

      })
      .catch((error: any) => console.error(error));
  }

}
