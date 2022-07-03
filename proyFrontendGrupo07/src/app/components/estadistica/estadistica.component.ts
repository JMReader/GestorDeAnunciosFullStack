import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { AreaService } from 'src/app/services/area.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  areas: Array<Area> = [];
  contadorTotal: number = 0;
  cont: number = 0;
  display: boolean = false;
  elemento!:boolean;

  constructor(private anuncioService: AnunciosService, private areaService: AreaService) {
    this.obtenerAreas();
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
          this.contadorTotal++;
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

}
