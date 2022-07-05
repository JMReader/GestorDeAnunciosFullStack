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
  display: boolean = false;
  //anuncio: Anuncio = new Anuncio(); 

  constructor(private as :AnunciosService, private es : EmpleadoService) {
    this.obtenerAnuncios();
   }

  async obtenerAnuncios() {
    //Hago que el array de anuncios este vacio
    this.anuncios = new Array<Anuncio>();
    //Obtengo todos los anuncios
    this.as.getAnuncios().subscribe((result) => {
      console.log(result);
      result.forEach((element: any) => {
        //creo un elemento anuncio
        var unAnuncio = new Anuncio();
        //Lo lleno de valores
        Object.assign(unAnuncio, element);
        //Lo cargo en el array de anuncios
        this.anuncios.push(unAnuncio);
      });
    },
      error => {
        console.log(error);
      });
    console.log("Anuncios: ");
    console.log(this.anuncios);
    //Obtengo el id del usuario que esta logueado
    var id= sessionStorage.getItem('_id')
    var unEmpleado = new Empleado();
    //Uso el get para obtener los empleados
    this.es.getEmpleado().subscribe((result) => {
      console.log(result);
      result.forEach((element: Empleado) => {
        //Busco solo el empleado que me interesa (mismo ID)

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
    // Esto lo uso para esperar a que termine de buscar los empleados antes de seguir
    await new Promise(f => setTimeout(f, 90));
    console.log(unEmpleado);
    console.log(this.anuncios);
    //Aqui filtro los anuncios que tienen el mismo area que el que esta conectado y el estado de confeccion
    this.anuncios=this.anuncios.filter(o => { 
      //Pongo o.redactor.area.toString() porque, si bien es un objeto area, vuelve solo el id porque no tiene el populate
      //entonces al hacerlo string, puedo compararlo con el id del conectado

      return o.redactor.area.toString() === unEmpleado.area._id  && o.estado === "Confeccionado"});
    console.log(this.anuncios);
    await new Promise(f => setTimeout(f, 90));
    this.display = true;
  }

  async autorizar(anuncio: Anuncio){
    anuncio.estado = "Autorizado";
    this.as.updateAnuncio(anuncio,anuncio._id).subscribe((result) => {
      console.log(result);
    },
      error => {
        console.log(error);
      });
      await new Promise(f => setTimeout(f, 90));
    this.obtenerAnuncios();
  }

  async cancelar(anuncio: Anuncio){
    anuncio.estado = "Cancelado";
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
