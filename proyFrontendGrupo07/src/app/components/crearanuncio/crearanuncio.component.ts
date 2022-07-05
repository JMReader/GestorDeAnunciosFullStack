import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Rol } from 'src/app/models/rol';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { LoginService } from 'src/app/services/login.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';
import { Medio } from 'src/app/models/medio';
import { MedioService } from 'src/app/services/medio.service';
import { DatePipe } from '@angular/common'
import { ElementForList } from 'src/app/models/element-for-list';
import { FbService } from 'src/app/services/fb.service';

@Component({
  selector: 'app-crearanuncio',
  templateUrl: './crearanuncio.component.html',
  styleUrls: ['./crearanuncio.component.css']
})
export class CrearanuncioComponent implements OnInit {
  destinatarios: Array<Rol> = new Array<Rol>();
  anuncio!: Anuncio;
  tipos!: Array<string>;
  mediosDisponibles!: Array<Medio>;
  recursos!: string;
  redactor!: string;
  display: boolean = false;
  displayMedios: boolean = false;
  tvSelected: boolean = false;
  textoSelected: boolean = false;
  HTMLSelected: boolean = false;
  imagenSelected: boolean = false;
  videoSelected: boolean = false;
  otroSelected: boolean = false;
  fbSelected: boolean = false;
  fbEstado: boolean = false;
  archivoCargado: boolean = false;
  addMedio: boolean = false;
  checkMedio: boolean = true;
  area!: string;
  ArrayRecursos = new  Array<string>(); 
  //DROPDOWN DESTINATARIOS
  dataDestinatario: Array<ElementForList> = new Array<ElementForList>();//{ item_id: number, item_text: string }
  settingsDestinatario: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: "Seleccionar Todos",
    unSelectAllText: "Deseleccionar Todos"
  };
  //DROPDOWN MEDIO
  dataMedios: Array<ElementForList> = new Array<ElementForList>();//{ item_id: number, item_text: string }
  settingsMedio: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: "Seleccionar Todos",
    unSelectAllText: "Deseleccionar Todos"
  };
  //[settings]="settingsMedio" [data]="dataMedios"
  anunciosForm = new FormGroup({
    tituloAnuncio: new FormControl(),
    tipoAnuncio: new FormControl(),
    textoAnuncio: new FormControl(),
    videoAnuncio: new FormControl(),
    htmlAnuncio: new FormControl(),
    medioAnuncio: new FormControl([], Validators.required),
    fechaInicio: new FormControl(),
    fechaFin: new FormControl(),
    estadoAnuncio: new FormControl(),
    destinatariosAnuncio: new FormControl([], Validators.required),
    lecturaAnuncio: new FormControl(),
    objectMedio: new FormControl(),
    urlFB: new FormControl(),
    textoFB: new FormControl(),
  });
 


 // constructor(private anuncioService: AnunciosService, public loginService: LoginService, private router: Router, private areaService: AreaService, private rolService: RolService) {
 //   if (this.loginService.userLoggedIn()&&!this.loginService.esEncargado()) {
 //     this.cargarDestinatarios();

  constructor(private anuncioService: AnunciosService, public loginService: LoginService, 
    private router: Router, private areaService: AreaService, private rolService: RolService, 
    private ms: MedioService, private dp: DatePipe, private fbService: FbService) {
    if (this.loginService.userLoggedIn()&&!this.loginService.esEncargado()) {
       this.cargarDestinatarios();
      this.anuncio = new Anuncio();
       this.tipos = new Array<string>();
       this.tipos = ["Texto", "HTML", "Imagen", "Video", "Otro"];
      this.cargarMedios();
    } else {
      alert("Acceso no autorizado: Debe haberse validado, además de ser un empleado");
      this.router.navigate(['login']);
    }
  }

  async cargarMedios() {
    this.mediosDisponibles = new Array<Medio>();
    var unMedio = new Medio();
    // unMedio.nombre = "Twitter";
    // unMedio._id ="Twitter";
    // unMedio.usuario=""
    // this.mediosDisponibles.push(unMedio);
    // unMedio = new Medio();
    // unMedio.nombre = "YouTube";
    // unMedio._id ="YouTube";
    // unMedio.usuario=""
    // this.mediosDisponibles.push(unMedio);
    unMedio.nombre = "Facebook";
    unMedio._id ="Facebook";
    this.mediosDisponibles.push(unMedio);
    unMedio = new Medio();
    unMedio.nombre = "TV";
    unMedio._id ="TV";
    this.mediosDisponibles.push(unMedio);
    this.ms.getMedios().subscribe(
      (result) => {
        result.forEach((element: any) => {
          var unMedio = new Medio();
          Object.assign(unMedio, element);
          this.mediosDisponibles.push(unMedio);
        });
      });
    await new Promise(f => setTimeout(f, 90));
    console.log("medios")
    console.log(this.mediosDisponibles);
    this.anunciosForm.get('medioAnuncio')?.setValue([]);
    this.dataMedios = new Array<ElementForList>();

    this.mediosDisponibles.forEach(element => {
      var elemento = new ElementForList();
      elemento.item_id = element._id;
      elemento.item_text = element.nombre;
      this.dataMedios.push(elemento);
    });
    console.log(this.dataDestinatario);
    await new Promise(f => setTimeout(f, 90));
    this.displayMedios=true;
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
    await new Promise(f => setTimeout(f, 70));
    this.destinatarios = this.destinatarios.filter(o => { return o.areaAsignada._id === area._id }).slice();
    //console.log(this.destinatarios);
    await new Promise(f => setTimeout(f, 10));
    //cargar dropdown de destinatarios
    this.anunciosForm.get('destinatariosAnuncio')?.setValue([]);
    this.dataDestinatario = new Array<ElementForList>();

    for (let element of this.destinatarios) {
      var elemento = new ElementForList();
      elemento.item_id = element._id;
      elemento.item_text = element.nombreRol;
      this.dataDestinatario.push(elemento);
    }
    console.log(this.dataDestinatario);
    await new Promise(f => setTimeout(f, 50));
    this.display=true;
    /*this.destinatarios.forEach((element:any) => {
    });*/
    //console.log(this.dataDestinatario);
  }

  cont!: number;
  cambiar(){
    this.cont=0;
    if(this.fbEstado==true){
      this.fbEstado=false;
    }
    else{
      this.fbEstado=true
    }
  }

  postearFb(){
    if(this.fbSelected == true){
      if (this.fbEstado == true) {
        var texto = this.anunciosForm.get('textoFB')?.value;
        this.fbService.postearFb(texto)
        console.log("xd")
      } else {
        var texto = this.anunciosForm.get('textoFB')?.value;
        var url = this.anunciosForm.get('urlFB')?.value;
        this.fbService.postearImgFb(url,texto)
      }
    }
  }

  crearAnuncio() {
    if(this.fbSelected == true){
      if (this.fbEstado == true) {
        var texto = this.anunciosForm.get('textoFB')?.value;
        this.fbService.postearFb(texto)
        console.log("xd")
      } else {
        var texto = this.anunciosForm.get('textoFB')?.value;
        var url = this.anunciosForm.get('urlFB')?.value;
        this.fbService.postearImgFb(url,texto)
      }
    }

    var tipo = this.anunciosForm.get('tipoAnuncio')?.value;
    this.anuncio.tipo = tipo;
    this.anuncio.titulo = this.anunciosForm.get('tituloAnuncio')?.value;
    var mediosSeleccionados = new Array<Medio>();
    var medios = this.anunciosForm.get('medioAnuncio')?.value;
  
      medios.forEach((element: ElementForList) => {
        var unMedio= new Medio();
        if (element.item_id != "TV" && element.item_id !="Facebook"){
        unMedio._id = element.item_id;
        mediosSeleccionados.push(unMedio);
        }
      });

    this.anuncio.tvSelected=this.tvSelected;
    this.anuncio.fbSelected=this.fbSelected;
    this.anuncio.medios = mediosSeleccionados;
    this.anuncio.fechaEntrada = this.anunciosForm.get('fechaInicio')?.value;
    this.anuncio.estado = "Confeccionado";
    var objeto= JSON.parse(sessionStorage.getItem("area")!);
    this.area = objeto._id;
    console.log(this.area);
    var date= new Date() ;
    var dateString= this.dp.transform(date, 'yyyy-MM-dd')?.toString();
    if (dateString != undefined){
    this.anuncio.fechaCreacion = dateString;
    }
    console.log("Fecha Creacion"+this.anuncio.fechaCreacion )
    var destinatarios = new Array<ElementForList>();
    destinatarios = this.anunciosForm.get('destinatariosAnuncio')?.value;
    this.anuncio.tiempoLectura = this.anunciosForm.get('lecturaAnuncio')?.value;
    this.redactor = sessionStorage.getItem("_id")!;
    console.log("redactor"+this.redactor);
    this.anuncio.recursos = new Array<string>();
    switch (tipo) {
    case "Texto":{
      var texto = this.anunciosForm.get('textoAnuncio')?.value;
      this.anuncio.recursos.push(texto);
      break;
    }
    case "Video":{
      var video = this.anunciosForm.get('videoAnuncio')?.value;
      this.anuncio.recursos.push(video);
      break;
    }
    case "HTML":{
      var html = this.anunciosForm.get('htmlAnuncio')?.value;  
      this.anuncio.recursos.push(html);
      break;
    }
    case "Imagen":{
      if (this.tvSelected == true){
        this.anuncio.fechaSalida = this.anunciosForm.get('fechaFin')?.value;
      }
      this.anuncio.recursos = this.ArrayRecursos;
      break;
    }
    case "Otro":{
      var texto = this.anunciosForm.get('textoAnuncio')?.value;
      this.anuncio.recursos.push(texto);
      this.ArrayRecursos.forEach(element => {
        this.anuncio.recursos.push(element);
      });
    }
  }
    console.log(this.anuncio);
    console.log("Redactor" + this.redactor);
    this.anuncioService.postAnuncio(this.anuncio, this.redactor, destinatarios,this.area);
    this.anunciosForm.reset() 
}

  borradorAnuncio(){
    var tipo = this.anunciosForm.get('tipoAnuncio')?.value;
    this.anuncio.tipo = tipo;
    this.anuncio.titulo = this.anunciosForm.get('tituloAnuncio')?.value;
    var mediosSeleccionados = new Array<Medio>();
    var medios = this.anunciosForm.get('medioAnuncio')?.value;
  
      medios.forEach((element: ElementForList) => {
        var unMedio= new Medio();
        if (element.item_id != "TV"){
        unMedio._id = element.item_id;
        mediosSeleccionados.push(unMedio);
        }
      });

    this.anuncio.tvSelected=this.tvSelected;
    this.anuncio.fbSelected=this.fbSelected;
    this.anuncio.medios = mediosSeleccionados;
    this.anuncio.fechaEntrada = this.anunciosForm.get('fechaInicio')?.value;
    this.anuncio.estado = "Borrador";
    var objeto= JSON.parse(sessionStorage.getItem("area")!);
    this.area = objeto._id;
    var date= new Date() ;
    var dateString= this.dp.transform(date, 'yyyy-MM-dd')?.toString();
    if (dateString != undefined){
    this.anuncio.fechaCreacion = dateString;
    }
    console.log("Fecha Creacion"+this.anuncio.fechaCreacion )
    var destinatarios = new Array<ElementForList>();
    destinatarios = this.anunciosForm.get('destinatariosAnuncio')?.value;
    this.anuncio.tiempoLectura = this.anunciosForm.get('lecturaAnuncio')?.value;
    this.redactor = sessionStorage.getItem("_id")!;
    this.anuncio.recursos = new Array<string>();
    switch (tipo) {
    case "Texto":{
      var texto = this.anunciosForm.get('textoAnuncio')?.value;
      this.anuncio.recursos.push(texto);
      break;
    }
    case "Video":{
      var video = this.anunciosForm.get('videoAnuncio')?.value;
      this.anuncio.recursos.push(video);
      break;
    }
    case "HTML":{
      var html = this.anunciosForm.get('htmlAnuncio')?.value;  
      this.anuncio.recursos.push(html);
      break;
    }
    case "Imagen":{
      if (this.tvSelected == true){
        this.anuncio.fechaSalida = this.anunciosForm.get('fechaFin')?.value;
      }
      this.anuncio.recursos = this.ArrayRecursos;
      break;
    }
    case "Otro":{
      var texto = this.anunciosForm.get('textoAnuncio')?.value;
      this.anuncio.recursos.push(texto);
      this.ArrayRecursos.forEach(element => {
        this.anuncio.recursos.push(element);
      });
    }
  }
    console.log(this.anuncio);
    console.log("Redactor" + this.redactor);
    this.anuncioService.postAnuncio(this.anuncio, this.redactor, destinatarios,this.area);
    this.anunciosForm.reset() 
  }

//Comprobado
  onFileChanges(files: any) {
    this.ArrayRecursos = new Array<string>();
    console.log("File has changed:", files);
    files.forEach((file: any) => {
      this.ArrayRecursos.push(file.base64);
    });
    this.archivoCargado= true;
    console.log("Archivo cargado "+this.archivoCargado);
    console.log(this.ArrayRecursos);
  }

  async cambio(){
    var medios = this.anunciosForm.get('medioAnuncio')?.value;
    console.log(medios);
    var tv = false;
    medios.forEach((element: any) => {
      if (element.item_text === "TV" && element.item_id === "TV")
      {
        tv=true;
        this.anunciosForm.get('tipoAnuncio')?.setValue("Imagen");
        this.anunciosForm.get('tipoAnuncio')?.disable();
        this.tipoCambiado();
        this.anunciosForm.get('fechaFin')?.setValidators(Validators.required);
      }
    });

    await new Promise(f => setTimeout(f, 50));

    var fb = false;
    medios.forEach((element: any) => {
      if (element.item_text === "Facebook" && element.item_id === "Facebook")
      {
        fb=true;
        console.log(fb);
      }
    });

    await new Promise(f => setTimeout(f, 50));

    this.tvSelected = tv;
    this.fbSelected= fb;
    console.log(this.fbEstado)
    if (this.tvSelected == false){
      this.anunciosForm.get('tipoAnuncio')?.enable();
      this.anunciosForm.get('fechaFin')?.setValidators(Validators.nullValidator);
      this.anunciosForm.get('fechaFin')?.setValue(null);
    }
    //console.log("tvSelected: " + this.tvSelected);
    console.log("fbSelected: " + this.fbSelected);
  }
//revisar
  tipoCambiado(){
    var tipo = this.anunciosForm.get('tipoAnuncio')?.value;
    console.log("tipoAnuncio: " + tipo);
    this.ArrayRecursos = new Array<string>();
    console.log("Archivo cargado "+this.archivoCargado);
    switch (tipo) {
    case "Texto":{
      this.textoSelected = true;
      this.archivoCargado= false;
      this.anunciosForm.get('textoAnuncio')?.setValidators(Validators.required);

      this.HTMLSelected = false;
      this.anunciosForm.get('htmlAnuncio')?.setValidators(Validators.nullValidator);
      this.imagenSelected = false;
      this.videoSelected = false;
      
      this.anunciosForm.get('videoAnuncio')?.setValidators(Validators.nullValidator);
      this.otroSelected = false;

      this.anunciosForm.get('htmlAnuncio')?.setValue(null);
      this.anunciosForm.get('htmlAnuncio')?.markAsPristine;
      this.anunciosForm.get('videoAnuncio')?.setValue(null);
      this.anunciosForm.get('videoAnuncio')?.markAsPristine;
      this.anunciosForm.get('textoAnuncio')?.setValue(null);
      this.anunciosForm.get('textoAnuncio')?.markAsPristine;
      
      break;
    }
    case "Video":{
      this.videoSelected = true;
      this.archivoCargado= false;
      this.anunciosForm.get('videoAnuncio')?.setValidators(Validators.required);

      this.textoSelected = false;
      this.anunciosForm.get('textoAnuncio')?.setValidators(Validators.nullValidator);
      this.imagenSelected = false;
      
      this.HTMLSelected = false;
      this.anunciosForm.get('htmlAnuncio')?.setValidators(Validators.nullValidator);
      this.otroSelected = false;
      
      this.anunciosForm.get('htmlAnuncio')?.setValue(null);
      this.anunciosForm.get('htmlAnuncio')?.markAsPristine;
      this.anunciosForm.get('videoAnuncio')?.setValue(null);
      this.anunciosForm.get('videoAnuncio')?.markAsPristine;
      this.anunciosForm.get('textoAnuncio')?.setValue(null);
      this.anunciosForm.get('textoAnuncio')?.markAsPristine;
      break;
    }
    case "Imagen":{
      this.imagenSelected = true;
      this.HTMLSelected = false;
      this.anunciosForm.get('htmlAnuncio')?.setValidators(Validators.nullValidator);
      this.textoSelected = false;
      this.anunciosForm.get('textoAnuncio')?.setValidators(Validators.nullValidator);
      this.videoSelected = false;
      this.anunciosForm.get('videoAnuncio')?.setValidators(Validators.nullValidator);
      this.otroSelected = false;
      
      this.anunciosForm.get('htmlAnuncio')?.setValue(null);
      this.anunciosForm.get('htmlAnuncio')?.markAsPristine;
      this.anunciosForm.get('videoAnuncio')?.setValue(null);
      this.anunciosForm.get('videoAnuncio')?.markAsPristine;
      this.anunciosForm.get('textoAnuncio')?.setValue(null);
      this.anunciosForm.get('textoAnuncio')?.markAsPristine;
      break;
    }
    case "HTML":{
      this.HTMLSelected = true;
      this.archivoCargado= false;
      this.anunciosForm.get('htmlAnuncio')?.setValidators(Validators.required);

      this.imagenSelected = false;
      this.textoSelected = false;
      this.anunciosForm.get('textoAnuncio')?.setValidators(Validators.nullValidator);
      this.videoSelected = false;
      this.anunciosForm.get('videoAnuncio')?.setValidators(Validators.nullValidator);
      this.otroSelected = false;
      
      this.anunciosForm.get('htmlAnuncio')?.setValue(null);
      this.anunciosForm.get('htmlAnuncio')?.markAsPristine;
      this.anunciosForm.get('videoAnuncio')?.setValue(null);
      this.anunciosForm.get('videoAnuncio')?.markAsPristine;
      this.anunciosForm.get('textoAnuncio')?.setValue(null);
      this.anunciosForm.get('textoAnuncio')?.markAsPristine;
      break;
    }
    case "Otro":{
      this.otroSelected = true
      this.archivoCargado= false;
      this.anunciosForm.get('textoAnuncio')?.setValidators(Validators.required);

      this.HTMLSelected = false;
      this.anunciosForm.get('htmlAnuncio')?.setValidators(Validators.nullValidator);
      this.videoSelected = false;
      this.anunciosForm.get('videoAnuncio')?.setValidators(Validators.nullValidator);
      this.textoSelected = false;
      this.imagenSelected = false;
      
      this.anunciosForm.get('htmlAnuncio')?.setValue(null);
      this.anunciosForm.get('htmlAnuncio')?.markAsPristine;
      this.anunciosForm.get('videoAnuncio')?.setValue(null);
      this.anunciosForm.get('videoAnuncio')?.markAsPristine;
      this.anunciosForm.get('textoAnuncio')?.setValue(null);
      this.anunciosForm.get('textoAnuncio')?.markAsPristine;
      break;
    }
    }
  }

  comprobarArchivo():boolean {
    if (this.imagenSelected == true || this.otroSelected == true){
      if (this.archivoCargado == true)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    else{
      return false;
    }
  }

  comprobarMedio(){
    this.addMedio=true;
  }

  agregarMedio(){
    var unMedio = new Medio();

    unMedio.nombre = this.anunciosForm.get('objectMedio')?.value;
    this.addMedio = false;

    this.ms.pushMedio(unMedio).subscribe(
      (result) => {
        console.log(result);
      }
    )
    this.anunciosForm.get('objectMedio')?.patchValue(null);;
    this.cargarMedios();
  }

  emptyMedio(){
    this.checkMedio =false;
    let medioBlanco: string = this.anunciosForm.get('objectMedio')?.value; 
    if( /\S/.test(medioBlanco)==false){
      this.checkMedio = true;
    }
    if(/^\s/.test(medioBlanco)==true){
      this.checkMedio = true;
    }
  }

  ngOnInit(): void {

  }

}
