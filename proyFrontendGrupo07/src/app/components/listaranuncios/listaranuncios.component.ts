import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';

@Component({
  selector: 'app-listaranuncios',
  templateUrl: './listaranuncios.component.html',
  styleUrls: ['./listaranuncios.component.css']
})
export class ListaranunciosComponent implements OnInit {

  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio(); 


  constructor() { }

  ngOnInit(): void {
  }

  
}
