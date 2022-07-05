import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-creararea',
  templateUrl: './creararea.component.html',
  styleUrls: ['./creararea.component.css']
})
export class CrearareaComponent implements OnInit {
  areas = new Array<Area>();

  areaForm = new FormGroup({
    nombreArea: new FormControl(),
  });


  constructor(private as: AreaService, public loginService: LoginService, private router: Router) {
    if (this.loginService.userLoggedIn() && this.loginService.esEncargado()) {
      this.as.getArea().subscribe(
        (result) => {
          result.forEach((element: any) => {
            var unArea = new Area();
            Object.assign(unArea, element);
            this.areas.push(unArea);
          });
        });
      console.log(this.areas);
    } else {
      alert("Acceso no autorizado: Debe haberse validado y ser un encargado");
      this.router.navigate(['login']);
    }

  }

  enviarArea() {
    var nombreArea = this.areaForm.get('nombreArea')?.value;
    var unArea = new Area();
    unArea.nombreArea = nombreArea;
    this.as.guardarArea(unArea).subscribe(
      (result) => {
        console.log(result);
      });
    this.areas = new Array<Area>();
    this.as.getArea().subscribe(
      (result) => {
        console.log(result);
        result.forEach((element: any) => {
          this.areas.push(element);
        });
      });
  }

  ngOnInit(): void {
  }

}
