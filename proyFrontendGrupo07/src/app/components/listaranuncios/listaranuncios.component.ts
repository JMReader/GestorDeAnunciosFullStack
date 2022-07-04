import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AnunciosService } from 'src/app/services/anuncios.service';

@Component({
  selector: 'app-listaranuncios',
  templateUrl: './listaranuncios.component.html',
  styleUrls: ['./listaranuncios.component.css']
})
export class ListaranunciosComponent implements OnInit {

  i: number=0;
  anunciosSlider: Array<Anuncio> = [];
  anuncioSlider: Anuncio = new Anuncio();
  bandTV: boolean=false;

  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio(); 

  constructor(private as :AnunciosService) {
    this.obtenerAnuncios();
   }

  async obtenerAnuncios() {
    this.as.getAnuncios().subscribe((result) => {
      console.log(result);
      result.forEach((element: any) => {
        var unAnuncio = new Anuncio();
        Object.assign(unAnuncio, element);
        this.anuncios.push(unAnuncio);

        for(var i = 0; i < unAnuncio.medio.length; i++){
          if(unAnuncio.medio[i]=="TV"){
            this.bandTV=true;
          }
        }
        if(this.bandTV==true || unAnuncio.tipo=="Imagen"){
          this.anunciosSlider.push(unAnuncio);
          this.bandTV=false;
        }

      });
      this.iniciar();
    },
      error => {
        console.log(error);
      });
      await new Promise(f => setTimeout(f, 80));
    console.log("Anuncios: ");
    console.log(this.anuncios);
    
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

  ngOnInit(): void {
  }

  
}
