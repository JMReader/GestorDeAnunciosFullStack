import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AnunciosService } from 'src/app/services/anuncios.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-listaranuncios',
  templateUrl: './listaranuncios.component.html',
  styleUrls: ['./listaranuncios.component.css']
})
export class ListaranunciosComponent implements OnInit {

  i: number=0;
  anunciosSlider: Array<Anuncio> = [];
  anuncioSlider: Anuncio = new Anuncio();
  anunciosListado : Array<Anuncio> = [];
  anuncioEnSlider: boolean=false;

  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio(); 

  constructor(private as :AnunciosService, private rout: Router) {
    this.obtenerAnuncios();
   }

  async obtenerAnuncios() {
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
      await new Promise(f => setTimeout(f, 250));
      this.anuncios = this.anuncios.filter(o => o.estado == "Autorizado");
      await new Promise(f => setTimeout(f, 90));
      this.anuncios.forEach(element => {
          if(element.tvSelected==true || element.tipo=="Imagen"){
            this.anunciosSlider.push(element);
            this.anuncioEnSlider=true;
          }
          else
          {
            this.anunciosListado.push(element);
          }
      });
      await new Promise(f => setTimeout(f, 200));
      this.iniciar();
    console.log("Anuncios: ");
    console.log(this.anunciosSlider);
    
  }

  iniciar(){
    if (this.i < this.anunciosSlider.length) {
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
  }

  siguiente(){
    this.i++;
    if (this.i < this.anunciosSlider.length) {
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
    else if (this.i = this.anunciosSlider.length) {
      this.i = 0;
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
  }

  anterior(){
    this.i--;
    if (this.i < this.anunciosSlider.length && this.i >= 0) {
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
    else {
      this.i = this.anunciosSlider.length - 1;
      this.anuncioSlider = this.anunciosSlider[this.i];
    }
  }

  redirect(link:string){
    this.rout.navigateByUrl('anuncios/descripcion?id='+link);
  }

  ngOnInit(): void {
  }

  
}
