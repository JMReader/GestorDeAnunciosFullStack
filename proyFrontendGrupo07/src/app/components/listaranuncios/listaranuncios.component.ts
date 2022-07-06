import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { Router } from "@angular/router";
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-listaranuncios',
  templateUrl: './listaranuncios.component.html',
  styleUrls: ['./listaranuncios.component.css']
})
export class ListaranunciosComponent implements OnInit {

  i: number = 0;
  anunciosSlider: Array<Anuncio> = [];
  anuncioSlider: Anuncio = new Anuncio();
  anunciosListado: Array<Anuncio> = [];
  anuncioEnSlider: boolean = false;
  logueado: boolean = true;

  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio();
  existen: boolean = true;
  muchos: boolean = false;

  constructor(private as: AnunciosService, private rout: Router) {
    this.obtenerAnuncios();
  }

  async obtenerAnuncios() {
    var area = JSON.parse(sessionStorage.getItem("area")!);
    var roles = JSON.parse(sessionStorage.getItem("roles")!);
    var encargado = sessionStorage.getItem("esEncargado")!;
    console.log(encargado);
    if (area != null) {
      this.anunciosSlider = new Array<Anuncio>();
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
      await new Promise(f => setTimeout(f, 150));
      this.anuncios = this.anuncios.filter(o => o.estado == "Autorizado" && o.area._id === area._id);
      await new Promise(f => setTimeout(f, 90));
      console.log(this.anuncios);
      var anunciosAux = new Array<Anuncio>();
      var coincide: boolean = false;

      if(encargado != "true"){
      this.anuncios.forEach(async anuncio => {
        await new Promise(f => setTimeout(f, 200));
        anuncio.destinatarios.forEach(async destinatario => {
          await new Promise(f => setTimeout(f, 60));
          roles.forEach((empleadoRol: Rol) => {
            if (destinatario.nombreRol === empleadoRol.nombreRol) {
              coincide = true;
              anunciosAux.push(anuncio);
            }
          });
        });
      });
      await new Promise(f => setTimeout(f, 400));
      console.log("Anuncios AUX")
      console.log(anunciosAux);
      console.log("Anuncios")
      console.log(this.anuncios);
      await new Promise(f => setTimeout(f, 40));
      this.anuncios = anunciosAux;
    }
      this.anunciosListado = new Array<Anuncio>();
      if (this.anuncios.length == 0) {
        this.existen = false;
      }
      this.anuncios.forEach(element => {
        
        if (element.tvSelected == true) {//|| element.tipo=="Imagen"
          this.anunciosSlider.push(element);
          this.anuncioEnSlider = true;
        }
        else {
          this.anunciosListado.push(element);
        }
      });
      await new Promise(f => setTimeout(f, 200));
      console.log("Anuncios Listado: ");
      console.log(this.anunciosListado);
      this.iniciar();
      console.log("Anuncios Slider: ");
      console.log(this.anunciosSlider);
    }
    else {
      this.logueado = false;
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
      await new Promise(f => setTimeout(f, 250));
      if (this.anuncios.length == 0) {
        this.existen = false;
      }
      this.anunciosListado = new Array<Anuncio>();
      this.anuncios.forEach(element => {
        if (element.tvSelected == true) { // || element.tipo=="Imagen"
          this.anunciosSlider.push(element);
          this.anuncioEnSlider = true;
        }
        else {
          this.anunciosListado.push(element);
        }
      });
      await new Promise(f => setTimeout(f, 200));

      this.iniciar();
    }
  }

  iniciar() {
    if (this.anunciosSlider.length > 2) {
      this.muchos = true;
    }
    if (this.i < this.anunciosSlider.length) {
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
  }

  siguiente() {
    this.i++;
    if (this.i < this.anunciosSlider.length) {
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
    else if (this.i = this.anunciosSlider.length) {
      this.i = 0;
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
  }

  anterior() {
    this.i--;
    if (this.i < this.anunciosSlider.length && this.i >= 0) {
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
    else {
      this.i = this.anunciosSlider.length - 1;
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
  }

  redirect(link: string) {
    this.rout.navigateByUrl('anuncios/descripcion?id=' + link);
  }

  ngOnInit(): void {
  }


}
