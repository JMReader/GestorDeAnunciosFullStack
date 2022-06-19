import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crearanuncio',
  templateUrl: './crearanuncio.component.html',
  styleUrls: ['./crearanuncio.component.css']
})
export class CrearanuncioComponent implements OnInit {

  tipos!: Array<String>;
  recursos!: String;

  anunciosForm = new FormGroup({
    textoAnuncio: new FormControl(),
    tipoAnuncio: new FormControl(),
    medioAnuncio: new FormControl(),
    vigenciaAnuncio: new FormControl(),
    estadoAnuncio: new FormControl(),
    lecturaAnuncio: new FormControl()
  });

  constructor() {
    this.tipos = new Array<String>();
    this.recursos = new String;
    this.tipos = ["Texto","HTML","Imagen","Video","Otro"];
  }

  onFileChanges(files:any){
    console.log("File has changed:", files);
    this.recursos = files[0];
    }

  ngOnInit(): void {
  }

}
