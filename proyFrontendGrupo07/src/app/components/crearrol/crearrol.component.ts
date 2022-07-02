import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Area } from 'src/app/models/area';
import { Rol } from 'src/app/models/rol';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-crearrol',
  templateUrl: './crearrol.component.html',
  styleUrls: ['./crearrol.component.css']
})
export class CrearrolComponent implements OnInit {
  areas = new Array<Area>();
  roles = new Array<Rol>();
  rolForm = new FormGroup({
    area: new FormControl(),
    nombreRol: new FormControl([],this.unico()),
  });

  constructor(private as: AreaService, private rs: RolService) {
    this.as.getArea().subscribe(
      (result) => {
        result.forEach((element: any) => {
          var unArea = new Area();
          Object.assign(unArea, element);
          this.areas.push(unArea);
        });
      });
      console.log(this.areas);
  }

  obtenerRolesSegunArea(){
    var area= this.rolForm.get('area')?.value;
    if (area != null)
    {
      this.rs.getRoles().subscribe(
        (result) => {
          this.roles= new Array<Rol>();
          result.forEach((element: any) => {
            var unRol = new Rol();
            Object.assign(unRol, element);
            this.roles.push(unRol);
          });
        });
        console.log(this.roles);
        //this.delay(100);
      }
  }

unico(): ValidationErrors {  
  var roles = new Array<Rol>();
  (control: AbstractControl): { [key: string]: any } | null =>  
        
roles=this.roles.filter(o =>{ return o.nombreRol === control.value.toString()});

if (roles.length>1){
  return {["unique"]: false};
}
else{
  return {["unique"]: true};
}
}

error(a:any){
  console.log(a);
}
  enviarRol(){
  }

  ngOnInit(): void {
  }

}
