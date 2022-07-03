import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { AreaService } from 'src/app/services/area.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  areas: Array<Area> = [];
  cont: number = 0;
  display: boolean = false;
  display2: boolean = false;
  elemento!: boolean;

  roles: Array<Rol> = [];
  empleados: Array<Empleado> = [];

  constructor(private anuncioService: AnunciosService, private areaService: AreaService,
    private rolService: RolService, private empleadoService: EmpleadoService) {
    this.obtenerAreas();
    this.obtenerRoles();
  }

  ngOnInit(): void {
  }

  async obtenerAreas() {
    this.areas = new Array();
    this.areaService.getArea().subscribe(
      (result) => {
        var area = new Area();
        result.forEach((element: any) => {
          Object.assign(area, element)
          this.areas.push(area);
          area = new Area();
        });
        console.log(this.areas, 'areas')

      },
      error => { alert("Error en la petición"); }
    )
    await new Promise(f => setTimeout(f, 50));
    var cont: number;
    this.areas.forEach(async element => {

      this.anuncioService.getFiltroArea(element._id).subscribe(
        async (result) => {
          console.log(result, 'resultado')
          cont = result.length;
          console.log(element._id, 'id')
          console.log(cont, 'contador anuncio')

          console.log(element.nombreArea)
          console.log(cont)
          this.pieChart.dataTable.push([element.nombreArea, cont])
          this.BarChart.dataTable.push([element.nombreArea, cont])
          console.log(cont, 'cantidad')
          await new Promise(f => setTimeout(f, 50));
        }
      )
      await new Promise(f => setTimeout(f, 80));
      this.display = true;
    });
  }

  pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Areas', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por area' },
  };

  BarChart: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Areas', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por area' },
  };

  showData() {
    return (this.elemento = true);
  }
  hideData() {
    return (this.elemento = false);
  }

  async obtenerRoles() {
    this.empleados = new Array();
    this.empleadoService.getEmpleado().subscribe(
      (result) => {
        var emp = new Empleado();
        result.forEach((element: any) => {
          Object.assign(emp, element)
          this.empleados.push(emp);
          emp = new Empleado();
        });
        console.log(this.empleados, 'empleados obtenidos')
      },
      error => { alert("Error en la petición"); }
    )

    await new Promise(f => setTimeout(f, 50));
    var contA: number;

    this.empleados.forEach(async element => {

      this.anuncioService.getFiltroRedactor(element._id).subscribe(
        async (result) => {
          console.log(result, 'anuncio obtenido por redactor')
          contA = result.length;
          console.log(contA, 'cantidad anuncio por redactor')

          for (let i in element.roles) {
            //this.roles.push(element.roles[i].nombreRol)
            //this.roles.push(element.roles[i])
            this.pieChartRol.dataTable.push([element.roles[i].nombreRol, contA])
            this.BarChartRol.dataTable.push([element.roles[i].nombreRol, contA])
            await new Promise(f => setTimeout(f, 50));
          }
        }
      )

    });
    await new Promise(f => setTimeout(f, 50));
    this.display2 = true;
  }

  pieChartRol: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Rol', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por rol' },
  };

  BarChartRol: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Rol', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por rol' },
  };

}
