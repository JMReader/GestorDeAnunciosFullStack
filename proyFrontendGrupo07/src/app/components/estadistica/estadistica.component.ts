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
import { ThisReceiver } from '@angular/compiler';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  //utilizado para obtener estadisticas por areas y roles
  areas: Array<Area> = []; //
  anun: Array<Anuncio> = [];
  roles: Array<Rol> = [];
  anuncios!: Array<Anuncio>;
  elemento: boolean=false;
  elemento2!:boolean;
  display: boolean = false;
  display2: boolean = false;
  desde!: string;
  hasta!: string;
  

  constructor(private anuncioService: AnunciosService, private areaService: AreaService,
    private rolService: RolService, private empleadoService: EmpleadoService, public loginService: LoginService, private router: Router) {
      if (this.loginService.userLoggedIn() && this.loginService.esEncargado()) {
        this.obtenerAreas();
        this.obtenerRoles();
      }else{
        alert("Acceso no autorizado: Debe haberse validado y ser un encargado");
        this.router.navigate(['login']);
      }
   
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

    this.anun = new Array();
    this.anuncioService.getAnuncios().subscribe(
      (result) => {
        var anuncio = new Anuncio();
        result.forEach((element: any) => {
          Object.assign(anuncio, element)
          this.anun.push(anuncio);
          anuncio = new Anuncio();
        });
        console.log(this.anun, 'anuncios')

      },
      error => { alert("Error en la petición"); }
    )

    await new Promise(f => setTimeout(f, 50));

    var num = 0;
    this.areas.forEach(async area => {
      console.log(area)
      await new Promise(f => setTimeout(f, 80));
      this.anun.forEach(anun => {
        console.log(area.nombreArea, 'area', anun.area.nombreArea, 'anun')
        if (area.nombreArea == anun.area.nombreArea) {
          num++;

        }
      });
      console.log(num, area.nombreArea, 'resultados')
      this.pieChart.dataTable.push([area.nombreArea, num])
      this.BarChart.dataTable.push([area.nombreArea, num])
      num = 0;
    });

    await new Promise(f => setTimeout(f, 80));
    this.display = true;
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
    this.roles = new Array();
    this.rolService.getRoles().subscribe(
      (result) => {
        var rol = new Rol();
        result.forEach((element: any) => {
          Object.assign(rol, element)
          this.roles.push(rol);
          rol = new Rol();
        });
        console.log(this.roles, 'roles')

      },
      error => { alert("Error en la petición"); }
    )

    this.anun = new Array();
    this.anuncioService.getAnuncios().subscribe(
      (result) => {
        var anuncio = new Anuncio();
        result.forEach((element: any) => {
          Object.assign(anuncio, element)
          this.anun.push(anuncio);
          anuncio = new Anuncio();
        });
        console.log(this.anun, 'anuncios')

      },
      error => { alert("Error en la petición"); }
    )

    await new Promise(f => setTimeout(f, 80));

    var num = 0;
    this.roles.forEach(async rol => {
      console.log(rol)
      await new Promise(f => setTimeout(f, 80));
      this.anun.forEach(anun => {
        console.log(rol._id, 'rol', anun.redactor._id, 'redac')
        if (rol.areaAsignada.nombreArea == anun.area.nombreArea) {
          num++;

        }
      });

      this.pieChartRol.dataTable.push([rol.nombreRol, num])
      this.BarChartRol.dataTable.push([rol.nombreRol, num])
      num = 0;
    });

    await new Promise(f => setTimeout(f, 80));
    this.display = true;
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

  async filtroPorFecha() {
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

    this.anuncios = new Array();
    this.anuncioService.getFiltrofechas(this.desde, this.hasta).subscribe(
      (result) => {
        // this.anuncios = result;
        var anun = new Anuncio();
        result.forEach((element: any) => {
          Object.assign(anun, element)
          this.anuncios.push(anun);
          anun = new Anuncio();
        });
        console.log(this.anuncios, 'anuncios')
      }
    )

    var num = 0;
    this.areas.forEach(async area => {
      console.log(area)
      await new Promise(f => setTimeout(f, 80));
      this.anuncios.forEach(anun => {
        console.log(area.nombreArea, 'area', anun.area.nombreArea, 'anun')
        if (area.nombreArea == anun.area.nombreArea) {
          num++;

        }
      });

      console.log(num, area.nombreArea, 'resultados')
      this.pieChartFiltroArea.dataTable.push([area.nombreArea, num])
      this.BarChartFiltroArea.dataTable.push([area.nombreArea, num])
      num = 0;
    });

    await new Promise(f => setTimeout(f, 80));
    this.display2 = true;
  }

  pieChartFiltroArea: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Areas', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por area' },
  };

  BarChartFiltroArea: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Areas', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por area' },
  };

  async filtroPorFechaRol() {
    this.roles = new Array();
    this.rolService.getRoles().subscribe(
      (result) => {
        var rol = new Rol();
        result.forEach((element: any) => {
          Object.assign(rol, element)
          this.roles.push(rol);
          rol = new Rol();
        });
        console.log(this.roles, 'roles')

      },
      error => { alert("Error en la petición"); }
    )

    await new Promise(f => setTimeout(f, 50));

    this.anun = new Array(); //antes deica this.anuncios
    this.anuncioService.getFiltrofechas(this.desde, this.hasta).subscribe(
      (result) => {
        // this.anuncios = result;
        var an = new Anuncio();
        result.forEach((element: any) => {
          Object.assign(an, element)
          this.anun.push(an);
          an = new Anuncio();
        });
        console.log(this.anun, 'anuncios')
      }
    )

    var num = 0;
    this.roles.forEach(async rol => {
      console.log(rol)
      await new Promise(f => setTimeout(f, 80));
      this.anun.forEach(anun => {
        console.log(rol._id, 'rol', anun.redactor._id, 'redac')
        if (rol.areaAsignada.nombreArea == anun.area.nombreArea) {
          num++;
        }
      });

      this.pieChartFiltroRol.dataTable.push([rol.nombreRol, num])
      this.BarChartFiltroRol.dataTable.push([rol.nombreRol, num])
      num = 0;
    });

    await new Promise(f => setTimeout(f, 80));
    this.display2 = true;
  }

  pieChartFiltroRol: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Rol', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por rol' },
  };

  BarChartFiltroRol: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [
      ['Rol', 'Anuncios']
    ],
    options: { 'title': 'Anuncios por rol' },
  };

  showDataFilter() {
    this.elemento2 = true;
    this.filtroPorFecha();
    this.filtroPorFechaRol();
  }

  hideDataFilter() {
    this.elemento2 = false;
    window.location.reload()
  }

}
