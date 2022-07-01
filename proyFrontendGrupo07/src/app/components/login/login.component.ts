import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { LoginService } from 'src/app/services/login.service';
import { FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //userform: Usuario = new Usuario(); //usuario mapeado al formulario
  userform: Empleado = new Empleado(); 
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  mensaje: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
   ) {
     
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'anuncios/crear'; //cambiar ruta por home
  }

  login() {
    this.loginService.login(this.userform.username, this.userform.password).subscribe(
      (result) => {
        var user = result;
        if (user.status == 1) {
          //guardamos el user en cookies en el cliente
          sessionStorage.setItem("user", user.username);
          sessionStorage.setItem("userid", user.userid);
          //sessionStorage.setItem("roles", user.roles);
          //redirigimos a home o a pagina que llamo
          this.router.navigateByUrl(this.returnUrl);
        } else {
          //usuario no encontrado muestro mensaje en la vista
          this.msglogin = "Credenciales incorrectas..";
          console.log(user);
        }
      },
      error => {
        alert("Error de conexion");
        console.log("error en conexion");
        console.log(error);
      }
    );
  }





}
