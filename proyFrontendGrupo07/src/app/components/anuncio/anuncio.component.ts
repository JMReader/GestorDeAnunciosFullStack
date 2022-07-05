import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { AnunciosService } from 'src/app/services/anuncios.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {
  anuncio: Anuncio = new Anuncio(); 
  anuncios: Array<Anuncio> = [];
  id: string = window.location.search;
  public rec ="";
  i: number=0;
  display: boolean = false;
  name: any;
  
  constructor(private as: AnunciosService, private route: ActivatedRoute,private router: Router) {
    this.id= this.id.slice(4)
    console.log("El id es: "+this.id);
    this.obtenerAnuncios();
   
   }



  async obtenerAnuncios() {
    await new Promise(f => setTimeout(f, 60));
    this.as.getAnuncios().subscribe((result) => {
      console.log(result);
      result.forEach((element: Anuncio) => {
        if(element._id == this.id){
          this.anuncio = new Anuncio();
          Object.assign(this.anuncio, element);
        }
      });
    },
      error => {
        console.log(error);
      });
      await new Promise(f => setTimeout(f, 140));
      console.log(this.anuncio);
      this.iniciar();
      await new Promise(f => setTimeout(f, 80));
      this.display = true;
  }


  iniciar(){
    if (this.i < this.anuncio.recursos.length) {
      this.rec = this.anuncio.recursos[this.i];
    }
  }

  siguiente(){
    this.i++;
    if (this.i < this.anuncio.recursos.length) {
      this.rec = this.anuncio.recursos[this.i];
    }
    else if (this.i = this.anuncio.recursos.length) {
      this.i = 0;
      this.rec= this.anuncio.recursos[this.i];
    }
  }

  anterior(){
    this.i--;
    if (this.i < this.anuncio.recursos.length && this.i >= 0) {
      this.rec = this.anuncio.recursos[this.i];
    }
    else {
      this.i = this.anuncio.recursos.length - 1;
      this.rec = this.anuncio.recursos[this.i];
    }
  }


  ngOnInit(): void {
    }
  }

