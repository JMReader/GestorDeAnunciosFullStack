import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Area } from 'src/app/models/area';
import { ElementForList } from 'src/app/models/element-for-list';
import { Empleado } from 'src/app/models/empleado';
import { Rol } from 'src/app/models/rol';
import { defer, from } from 'rxjs';
import { AreaService } from 'src/app/services/area.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearempleado',
  templateUrl: './crearempleado.component.html',
  styleUrls: ['./crearempleado.component.css']
})
export class CrearempleadoComponent implements OnInit {

  areas = new Array<Area>();
  roles = new Array<Rol>();
  elemento = new ElementForList();
  empleados = new Array<Empleado>();
  unEmpleado = new Empleado();
  areaElegida: boolean = false;
  dropdownList: Array<ElementForList> = [];//{ item_id: number, item_text: string }
  dropdownSettings: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text'
  };

  empleadoForm = new FormGroup({
    apellido: new FormControl(),
    nombre: new FormControl(),
    dni: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    legajo: new FormControl(),
    area: new FormControl(),
    roles: new FormControl([], Validators.required),
    encargado: new FormControl(),
  });



  constructor(private es: EmpleadoService, private rs: RolService, private as: AreaService,public loginService: LoginService, private router: Router) {
    if (this.loginService.userLoggedIn() && this.loginService.esEncargado()) {
      this.as.getArea().subscribe(
        (result) => {
          result.forEach((element: any) => {
            var unArea = new Area();
            Object.assign(unArea, element);
            this.areas.push(unArea);
          });
        });
  
      this.es.getEmpleado().subscribe(
        (result) => {
          console.log(result);
          result.forEach((element: any) => {
            this.empleados.push(element);
          });
        });
      console.log(this.empleados);
    }else{
      alert("Acceso no autorizado: Debe haberse validado y ser un encargado");
      this.router.navigate(['login']);
    }
  }

//  constructor(private es: EmpleadoService, private rs: RolService, private as: AreaService) {
//    this.cargar();
    
    
//  }

//  async cargar(){
//  this.as.getArea().subscribe(
//    (result) => {
//      result.forEach((element: any) => {
//        var unArea = new Area();
//        Object.assign(unArea, element);
//        this.areas.push(unArea);
//      });
//    });

//  this.es.getEmpleado().subscribe(
//    (result) => {
//      console.log(result);
//      result.forEach((element: any) => {
//        this.empleados.push(element);
//      });
//    });
//  console.log(this.empleados);
//  await new Promise(f => setTimeout(f, 100));
//}



  obtenerRolesSegunArea() {
    var area = this.empleadoForm.get('area')?.value;
    if (area != null) {
      this.rs.getRoles().subscribe(
        (result) => {
          this.roles = new Array<Rol>();
          result.forEach((element: any) => {
            var unRol = new Rol();
            Object.assign(unRol, element);
            this.roles.push(unRol);
          });
        });
      console.log(this.roles);
      this.delay(100);
    }
  }

  async enviarEmpleado() {
    var apellido = this.empleadoForm.get('apellido')?.value;
    var nombre = this.empleadoForm.get('nombre')?.value;
    var dni = this.empleadoForm.get('dni')?.value;
    var email = this.empleadoForm.get('email')?.value;
    var username = this.empleadoForm.get('username')?.value;
    var password = this.empleadoForm.get('password')?.value;
    var legajo = this.empleadoForm.get('legajo')?.value;
    var area = this.empleadoForm.get('area')?.value;
    var roles = this.empleadoForm.get('roles')?.value;
    var encargado = this.empleadoForm.get('encargado')?.value;
    this.es.guardarEmpleado(apellido, nombre, dni, email, username, password, legajo, area, roles, encargado);
    await new Promise(f => setTimeout(f, 80));
    this.empleados = new Array();
    this.es.getEmpleado().subscribe(
      (result) => {
        console.log(result);
        result.forEach((element: any) => {
          this.empleados.push(element);
        });
      });
  }

  ngOnInit(): void {
  }

  async delay(ms: number) {
    this.areaElegida = false;
    var area = this.empleadoForm.get('area')?.value;
    this.empleadoForm.get('roles')?.setValue([]);
    this.dropdownList = new Array<ElementForList>();
    await new Promise(f => setTimeout(f, 50));
    this.roles = this.roles.filter(o => { return o.areaAsignada._id === area });
    this.roles.forEach(element => {

      this.elemento = new ElementForList();
      this.elemento.item_id = element._id;
      this.elemento.item_text = element.nombreRol;
      this.dropdownList.push(this.elemento);
    });

    this.areaElegida = true;
    console.log(this.dropdownList);

  }
  nombreArea(area: Area) {
    var areaAux = new Area();
    var areas = new Array<Area>();
    areas = this.areas.filter(o => { return o._id === area._id });
    areaAux = areas[0]
    //return areaAux.nombreArea;
  }

//}

}
