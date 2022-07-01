import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Rol } from 'src/app/models/rol';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-crearanuncio',
  templateUrl: './crearanuncio.component.html',
  styleUrls: ['./crearanuncio.component.css']
})
export class CrearanuncioComponent implements OnInit {
  destinatarios: Array<Rol> = new Array<Rol>();
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

  constructor(private anuncioService: AnunciosService, public loginService: LoginService, private router: Router,) {
    if (this.loginService.userLoggedIn()) {
      this.cargarDestinatarios();
      this.anuncio = new Anuncio();
      this.tipos = new Array<string>();
      this.mediosDisponibles = new Array<string>();
      this.tipos = ["Texto", "HTML", "Imagen", "Video", "Otro"];
      this.mediosDisponibles = ["Twitter", "Facebook", "Youtube", "TikTok"];
    } else {
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
    }
  }

  cargarDestinatarios() { //obtengo el string con el array de roles, lo transformo en JSON, luego lo recorro y lo guardo destinatarios
    var roles = JSON.parse(sessionStorage.getItem("roles")!);
    roles.forEach((item: any) => {
      var rol = new Rol();
      Object.assign(rol,item);
      this.destinatarios.push(rol);
    });
    console.log(this.destinatarios);

  }

  crearAnuncio() {

    this.anuncio.texto = this.anunciosForm.get('textoAnuncio')?.value;
    this.anuncio.tipo = this.anunciosForm.get('tipoAnuncio')?.value;
    this.anuncio.medio = this.anunciosForm.get('medioAnuncio')?.value;
    this.anuncio.fechaEntrada = this.anunciosForm.get('vigenciaAnuncio')?.value;
    this.anuncio.estado = this.anunciosForm.get('estadoAnuncio')?.value;
    this.anuncio.destinatarios.push(this.anunciosForm.get('destinatariosAnuncio')?.value);
    //this.anuncio.recursos ya se carga en el metodo "onfilechanges" con los archivos base64
    this.anuncio.tiempoLectura = this.anunciosForm.get('lecturaAnuncio')?.value;
    this.anuncio.redactor = this.anunciosForm.get('redactorAnuncio')?.value;
    //console.log(this.anuncio);
    this.anuncioService.postAnuncio(this.anuncio).subscribe(
      (result) => {
        //console.log(result);
        alert("Anuncio guardado.");
        this.anuncio = new Anuncio();
      },
      (errors) => {
        console.log(errors);
      }
    );


  }


  onFileChanges(files: any) {
    this.anuncio.recursos = new Array<string>();
    console.log("File has changed:", files);
    files.forEach((file: any) => {
      this.anuncio.recursos.push(file.base64);
    });
    console.log(this.anuncio.recursos);
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
