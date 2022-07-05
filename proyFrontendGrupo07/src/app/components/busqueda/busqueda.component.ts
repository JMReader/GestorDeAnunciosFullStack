import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Anuncio } from 'src/app/models/anuncio';
import { ElementForList } from 'src/app/models/element-for-list';
import { AnunciosService } from 'src/app/services/anuncios.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  display : boolean = false;
  filtrosDisponibles: Array<string> = [];
  anuncios = new Array<Anuncio>();
  //DROPDOWN FILTRO
  dataFiltros: Array<ElementForList> = new Array<ElementForList>();//{ item_id: number, item_text: string }
  settingsFiltros: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: "Seleccionar Todos",
    unSelectAllText: "Deseleccionar Todos"
  };

  filtroForm = new FormGroup({
    filtros: new FormControl([], Validators.required),
    destinatarios: new FormControl([]),//[], Validators.required
    fechaStart: new FormControl(),
    fechaEnd: new FormControl(),
    medios: new FormControl([]),//[], Validators.required
    titulo: new FormControl(),
    tipo: new FormControl(),
    estado: new FormControl(),
    redactor: new FormControl(),
  })


  constructor(private as: AnunciosService) { 
this.obtenerAnuncios();
this.cargarFiltros();
  }

  obtenerAnuncios(){
    this.anuncios = new Array<Anuncio>();
    this.as.getAnuncios().subscribe(result => {
      console.log(result);
      result.forEach((element : any) => {
        var unAnuncio = new Anuncio();
        Object.assign(unAnuncio, element);
        this.anuncios.push(unAnuncio);
      });
    });
  }

  async cargarFiltros(){
    //destinatario, fechas, medio de publicación, texto, tipo de contenido,estado, redactor
    this.filtrosDisponibles= new Array<string>();
    this.filtrosDisponibles.push("Destinatario");
    this.filtrosDisponibles.push("Fechas");
    this.filtrosDisponibles.push("Medios");
    this.filtrosDisponibles.push("Titulo");
    this.filtrosDisponibles.push("Tipo");
    this.filtrosDisponibles.push("Estado");
    this.filtrosDisponibles.push("Redactor");
    await new Promise(f => setTimeout(f, 90));

    console.log("medios")
    console.log(this.filtrosDisponibles);

    this.filtroForm.get('filtros')?.setValue([]);
    this.dataFiltros = new Array<ElementForList>();

    this.filtrosDisponibles.forEach(element => {
      var elemento = new ElementForList();
      elemento.item_id = element;
      elemento.item_text = element;
      this.dataFiltros.push(elemento);
    });
    await new Promise(f => setTimeout(f, 90));
    console.log(this.dataFiltros);
    
    this.display=true;
  }

  cambioFiltro(){
    var filtrosElegidos = this.filtroForm.get('filtros')?.value;
    filtrosElegidos.forEach(async (element: any) => {

    switch (element.item_id){
      case "Fechas":{
        this.filtroForm.get('fechaStart')?.setValidators(Validators.required);
        this.filtroForm.get('fechaStart')?.setValue(null);

        this.filtroForm.get('fechaEnd')?.setValidators(Validators.required);
        this.filtroForm.get('fechaEnd')?.setValue(null);
        break;
      }
      case "Medios":{
        this.filtroForm.get('medios')?.setValidators(Validators.required);
        this.filtroForm.get('medios')?.setValue(null);
        break;
      }
      case "Titulo":{
        this.filtroForm.get('titulo')?.setValidators(Validators.required);
        this.filtroForm.get('titulo')?.setValue(null);
        break;
      }
      case "Tipo":{
        this.filtroForm.get('tipo')?.setValidators(Validators.required);
        this.filtroForm.get('tipo')?.setValue(null);
        break;
      }
      case "Estado":{
        this.filtroForm.get('estado')?.setValidators(Validators.required);
        this.filtroForm.get('estado')?.setValue(null);
        break;
      }
      case "Redactor":{
        this.filtroForm.get('redactor')?.setValidators(Validators.required);
        this.filtroForm.get('redactor')?.setValue(null);
        break;
      }
    } 
    await new Promise(f => setTimeout(f, 60));
    });
  }

  filtrar(){
    var filtrosElegidos = this.filtroForm.get('filtros')?.value;
    var anunciosAFiltrar = this.anuncios;
    var anunciosEncontrados = true;
    filtrosElegidos.forEach(async (element: any) => {

      switch (element.item_id){
        case "Fechas":{
          var fechaInicio = this.filtroForm.get('fechaStart')?.value;
          var fechaFin = this.filtroForm.get('fechaEnd')?.value;
          await new Promise(f => setTimeout(f, 30));
          // this.destinatarios = this.destinatarios.filter(o => { return o.areaAsignada._id === area._id }).slice();
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.fechaCreacion > fechaInicio && o.fechaCreacion < fechaFin});
          break;
        }
        case "Medios":{ //El unico que dudo si funcara o no :c
          var mediosElegidos = this.filtroForm.get('medios')?.value;

          mediosElegidos.forEach((medio : any) => {
            if (anunciosAFiltrar.find(medio) == undefined){
                anunciosEncontrados = false;
            }
          });
          await new Promise(f => setTimeout(f, 90));
          if (anunciosEncontrados == true){
            anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.medios == mediosElegidos});
          }
          //anunciosAFiltrar.find(mediosElegidos);
          break;
        }
        case "Titulo":{
          var titulo = this.filtroForm.get('titulo')?.value;
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.titulo == titulo});
          break;
        }
        case "Tipo":{
          var tipo = this.filtroForm.get('tipo')?.value;
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.tipo == tipo});
          break;
        }
        case "Estado":{
          var estado =this.filtroForm.get('estado')?.value;
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.estado == estado});
          break;
        }
        case "Redactor":{
          var redactor = this.filtroForm.get('redactor')?.value;//valor ID
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.redactor._id == redactor});
          break;
        }
      } 
      await new Promise(f => setTimeout(f, 80));
      });

  }
  

  ngOnInit(): void {
  }

}
