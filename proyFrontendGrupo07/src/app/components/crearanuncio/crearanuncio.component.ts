import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Anuncio } from 'src/app/models/anuncio';
import { AnunciosService } from 'src/app/services/anuncios.service';


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
    vigenciaAnuncio: new FormControl(),
    estadoAnuncio: new FormControl(),
    destinatariosAnuncio: new FormControl(),

    lecturaAnuncio: new FormControl(),
    redactorAnuncio: new FormControl()
  });

  constructor(private anuncioService: AnunciosService) {
    this.anuncio = new Anuncio();
    this.tipos = new Array<string>();
    this.mediosDisponibles = new Array<string>();
    this.tipos = ["Texto", "HTML", "Imagen", "Video", "Otro"];
    this.mediosDisponibles = ["Twitter", "Facebook", "Youtube", "TikTok"];
  }

  crearAnuncio() {

    this.anuncio.texto = this.anunciosForm.get('textoAnuncio')?.value;
    this.anuncio.tipo = this.anunciosForm.get('tipoAnuncio')?.value;
    this.anuncio.medio = this.anunciosForm.get('medioAnuncio')?.value;
    this.anuncio.fechaEntrada = this.anunciosForm.get('vigenciaAnuncio')?.value;
    this.anuncio.estado = this.anunciosForm.get('estadoAnuncio')?.value;
    this.anuncio.destinatarios.push(this.anunciosForm.get('destinatariosAnuncio')?.value);
    this.anuncio.recurso = "algo"; //this.recursos;
    this.anuncio.tiempoLectura = this.anunciosForm.get('lecturaAnuncio')?.value;
    this.anuncio.redactor = this.anunciosForm.get('redactorAnuncio')?.value;

    this.anuncioService.postAnuncio(this.anuncio).subscribe(
      (result) => {
        console.log(result);
        alert("Anuncio guardado.");
      },
      (errors) => {
        console.log(errors);
      }
    );

    //console.log(this.anuncio);
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
