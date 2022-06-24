import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Anuncio } from 'src/app/models/anuncio';


@Component({
  selector: 'app-crearanuncio',
  templateUrl: './crearanuncio.component.html',
  styleUrls: ['./crearanuncio.component.css']
})
export class CrearanuncioComponent implements OnInit {

  anuncio!: Anuncio;
  tipos!: Array<string>;
  mediosDisponibles!: Array<string>;
  recursos!: string;

  anunciosForm = new FormGroup({
    textoAnuncio: new FormControl(),
    tipoAnuncio: new FormControl(),
    medioAnuncio: new FormArray([], [Validators.required]),
    estadoAnuncio: new FormControl(),
    lecturaAnuncio: new FormControl(),


    destinatariosAnuncio: new FormControl(),
    vigenciaAnuncio: new FormControl(),
    redactorAnuncio: new FormControl()
  });

  constructor() {
    this.anuncio = new Anuncio();
    this.tipos = new Array<string>();
    this.mediosDisponibles = new Array<string>();
    this.tipos = ["Texto", "HTML", "Imagen", "Video", "Otro"];
    this.mediosDisponibles = ["Twitter", "FB", "Youtube", "TikTok"];
  }

  crearAnuncio() {

    this.anuncio.texto = this.anunciosForm.get('textoAnuncio')?.value;
    this.anuncio.tipo = this.anunciosForm.get('tipoAnuncio')?.value;
    this.anuncio.medio = this.anunciosForm.get('medioAnuncio')?.value;
    this.anuncio.fechaEntrada = this.anunciosForm.get('vigenciaAnuncio')?.value;
    this.anuncio.estado = this.anunciosForm.get('estadoAnuncio')?.value;
    this.anuncio.destinatarios = this.anunciosForm.get('destinatariosAnuncio')?.value;
    this.anuncio.recurso = this.recursos;
    this.anuncio.tiempoLectura = this.anunciosForm.get('lecturaAnuncio')?.value;
    this.anuncio.redactor = this.anunciosForm.get('redactorAnuncio')?.value;

    console.log(this.anuncio);
  }

  //Chequear si se debe transformar a base64 o no
  onFileChanges(files: any) {
    console.log("File has changed:", files);
    this.recursos = files[0];
  }

  onCheckChange(event: any) {

    const formArray: FormArray = this.anunciosForm.get('medioAnuncio') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
      console.log(formArray);
    }

    else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: AbstractControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }

  }

  ngOnInit(): void {

  }

}
