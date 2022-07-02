import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Rol } from 'src/app/models/rol';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { LoginService } from 'src/app/services/login.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ElementForList } from 'src/app/models/element-for-list';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';

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
  redactor!:string;

  //DROPDOWN
  dataDestinatario: Array<ElementForList> = new Array<ElementForList>();//{ item_id: number, item_text: string }
  settingsDestinatario: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text'
  };

  anunciosForm = new FormGroup({
    textoAnuncio: new FormControl(),
    tipoAnuncio: new FormControl(),
    medioAnuncio: new FormArray([], [Validators.required]),
    vigenciaAnuncio: new FormControl(),
    estadoAnuncio: new FormControl(),
    destinatariosAnuncio: new FormControl([],Validators.required),

    lecturaAnuncio: new FormControl(),
    //redactorAnuncio: new FormControl()
  });

  constructor(private anuncioService: AnunciosService, public loginService: LoginService, private router: Router, private areaService: AreaService, private rolService: RolService) {
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

  async cargarDestinatarios() { //obtengo el string con el array de roles, lo transformo en JSON, luego lo recorro y lo guardo destinatarios
    //buscar area del logeado
    var area = JSON.parse(sessionStorage.getItem("area")!);

    //cargardestinatarios con todos los roles
    this.destinatarios = new Array<Rol>();
    this.rolService.getRoles().subscribe(
      (result) => {
        result.forEach((element: any) => {
          var unRol = new Rol();
          Object.assign(unRol, element);
          this.destinatarios.push(unRol);
        });
      });
    //filtrar aquellos que solo coincidan con el id de area
    await new Promise(f => setTimeout(f, 50));
    this.destinatarios = this.destinatarios.filter(o => { return o.areaAsignada._id === area._id }).slice();
    //console.log(this.destinatarios);
    
    //cargar dropdown de destinatarios
    this.anunciosForm.get('destinatariosAnuncio')?.setValue([]);
    this.dataDestinatario = new Array<ElementForList>();
    
    for(let element of this.destinatarios){
      var elemento = new ElementForList();
      elemento.item_id = element._id;
      elemento.item_text = element.nombreRol;
      this.dataDestinatario.push(elemento);
    }
    console.log(this.dataDestinatario);
    /*this.destinatarios.forEach((element:any) => {
    });*/
    //console.log(this.dataDestinatario);
  }

  crearAnuncio() {

    this.anuncio.texto = this.anunciosForm.get('textoAnuncio')?.value;
    this.anuncio.tipo = this.anunciosForm.get('tipoAnuncio')?.value;
    this.anuncio.medio = this.anunciosForm.get('medioAnuncio')?.value;
    this.anuncio.fechaEntrada = this.anunciosForm.get('vigenciaAnuncio')?.value;
    this.anuncio.estado = this.anunciosForm.get('estadoAnuncio')?.value;
    var destinatarios = new Array<ElementForList>();
    destinatarios = this.anunciosForm.get('destinatariosAnuncio')?.value;
    //this.anuncio.recursos ya se carga en el metodo "onfilechanges" con los archivos base64
    this.anuncio.tiempoLectura = this.anunciosForm.get('lecturaAnuncio')?.value;
    this.redactor = sessionStorage.getItem("_id")!;
    this.anuncio.fechaCreacion=  new Date();
    console.log(this.anuncio);
    this.anuncioService.postAnuncio(this.anuncio,this.redactor, destinatarios);


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
