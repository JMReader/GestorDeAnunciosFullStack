import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Area } from 'src/app/models/area';
import { ElementForList } from 'src/app/models/element-for-list';
import { Rol } from 'src/app/models/rol';
import { AreaService } from 'src/app/services/area.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-crearempleado',
  templateUrl: './crearempleado.component.html',
  styleUrls: ['./crearempleado.component.css']
})
export class CrearempleadoComponent implements OnInit {
  
  areas = new Array<Area>();
  roles = new Array<Rol>();
  elemento = new ElementForList();
  areaElegida : boolean = false;
  dropdownList: Array<ElementForList> = [];//{ item_id: number, item_text: string }
  dropdownSettings:IDropdownSettings={
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
    roles: new FormControl([],Validators.required),
    encargado: new FormControl(),
  });


  constructor(private es: EmpleadoService, private rs: RolService, private as: AreaService) { 
    this.as.getArea().subscribe(
      (result) => {
        result.forEach((element: any) => {
          var unArea = new Area();
          Object.assign(unArea, element);
          this.areas.push(unArea);
        });
      });
  }

  obtenerRolesSegunArea(){
    console.log("Si");
    var area= this.empleadoForm.get('area')?.value;
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
        this.delay(100);
      }
  }

  enviarEmpleado(){
    var roles =this.empleadoForm.get('roles')?.value;
    console.log(roles);
  }

  ngOnInit(): void {
  }

  async delay(ms: number) {
    this.areaElegida=false;
    var area= this.empleadoForm.get('area')?.value;
    this.empleadoForm.get('roles')?.setValue([]);
    this.dropdownList= new Array<ElementForList>();
    await new Promise(f => setTimeout(f, 50));
    this.roles=this.roles.filter(o =>{ return o.areaAsignada.nombreArea === area});
    var num=0;
    this.roles.forEach(element => {
      num++;
      this.elemento = new ElementForList();
      this.elemento.item_id=num;
      this.elemento.item_text=element.nombreRol;
      this.dropdownList.push(this.elemento);
    });
    
    this.areaElegida=true;
    console.log(this.dropdownList);
}
    
}
