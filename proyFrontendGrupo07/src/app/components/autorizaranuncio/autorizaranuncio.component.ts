import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Empleado } from 'src/app/models/empleado';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-autorizaranuncio',
  templateUrl: './autorizaranuncio.component.html',
  styleUrls: ['./autorizaranuncio.component.css']
})
export class AutorizaranuncioComponent implements OnInit {

  anuncios: Array<Anuncio> = [];
  area!: string | null;
  //anuncio: Anuncio = new Anuncio(); 

  constructor(private as :AnunciosService, private es : EmpleadoService) {
    this.obtenerAnuncios();
   }

  async obtenerAnuncios() {
    this.anuncios = new Array<Anuncio>();
    this.as.getAnuncios().subscribe((result) => {
      console.log(result);
      result.forEach((element: any) => {
        var unAnuncio = new Anuncio();
        Object.assign(unAnuncio, element);
        this.anuncios.push(unAnuncio);
      });
    },
      error => {
        console.log(error);
      });
    console.log("Anuncios: ");
    console.log(this.anuncios);
    var id= sessionStorage.getItem('_id')
    var unEmpleado = new Empleado();
    this.es.getEmpleado().subscribe((result) => {
      console.log(result);
      result.forEach((element: Empleado) => {
        if (element._id==id) 
        {
          unEmpleado._id=element._id;
          unEmpleado.area=element.area;
        }
      });
    },
      error => {
        console.log(error);
      });
    await new Promise(f => setTimeout(f, 60));
    console.log(unEmpleado);
    console.log(this.anuncios);
    this.anuncios=this.anuncios.filter(o => { 
      console.log(o.redactor.area.toString());
      return o.redactor.area.toString() === unEmpleado.area._id  && o.estado === "Confeccion"});
    console.log(this.anuncios);
  }

  async autorizar(anuncio: Anuncio){
    anuncio.estado = "Autorizado";
    this.as.updateAnuncio(anuncio,anuncio._id).subscribe((result) => {
      console.log(result);
    },
      error => {
        console.log(error);
      });
      await new Promise(f => setTimeout(f, 60));
    this.obtenerAnuncios();
  }

  ngOnInit(): void {
  }

}
