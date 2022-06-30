import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';

@Injectable({
  providedIn: 'root'
})
export class FbService {
//service realizado para postear unicamente llamar a la funcion "postearFB"

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
        "access_token":"EAAGOAWeiyfIBAHI5UxVdpA9xH7BMcuhkGhR3DXOGm4XKPfZAezWd9CyEZAl6Q445Fu6rygxWbZCrMDZCyHVwhQNQpl1LinfUL5vOkloldijTX8nL7ZBYZA6yXZAYrX0oeJt6zPqbZCZBEGlAdJvsUZBoNduQxTIcB0tJ9WPhRvLfkBOXqzExZA7JLhAYaC2lslAW2ZAssBJ9zL91pLuqoOUAuV5g"
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
