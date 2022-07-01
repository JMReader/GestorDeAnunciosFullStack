import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AnunciosService } from 'src/app/services/anuncios.service';

@Component({
  selector: 'app-listaranuncios',
  templateUrl: './listaranuncios.component.html',
  styleUrls: ['./listaranuncios.component.css']
})
export class ListaranunciosComponent implements OnInit {

  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio(); 

  constructor(private as :AnunciosService) {
    this.obtenerAnuncios();
   }

  obtenerAnuncios() {
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
    
  }

  ngOnInit(): void {
  }

  
}
