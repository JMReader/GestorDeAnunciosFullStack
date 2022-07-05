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

  filtrosDisponibles: Array<string> = [];
  anuncios = new Array<Anuncio>();
  destinatarioSelected: boolean = false;
  fechasSelected: boolean = false;
  medioSelected: boolean = false;
  tituloSelected: boolean = false;
  tipoSelected: boolean = false;
  estadoSelected: boolean = false;
  redactorSelected: boolean = false;

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
    medio: new FormControl([]),//[], Validators.required
    titulo: new FormControl(),
    tipo: new FormControl(),
    estado: new FormControl(),
    redactor: new FormControl(),
  })


  constructor(private as: AnunciosService) {

  }

  obtenerAnuncios() {
    this.anuncios = new Array<Anuncio>();
    this.as.getAnuncios().subscribe(result => {
      console.log(result);
      result.forEach((element: any) => {
        var unAnuncio = new Anuncio();
        Object.assign(unAnuncio, element);
        this.anuncios.push(unAnuncio);
      });
    });
  }

  async cargarFiltros() {
    //destinatario, fechas, medio de publicación, texto, tipo de contenido,estado, redactor
    this.filtrosDisponibles = new Array<string>();
    this.filtrosDisponibles.push("Destinatario");
    this.filtrosDisponibles.push("Fechas");
    this.filtrosDisponibles.push("Medio");
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

    //this.displayMedios=true;
  }

  cambioFiltro() {
    var filtrosElegidos = this.filtroForm.get('filtros')?.value;
    filtrosElegidos.forEach(async (element: any) => {

      switch (element.item_id) {
        case "Fechas": {
          this.filtroForm.get('fechaStart')?.setValidators(Validators.required);
          this.filtroForm.get('fechaStart')?.setValue(null);

          this.filtroForm.get('fechaEnd')?.setValidators(Validators.required);
          this.filtroForm.get('fechaEnd')?.setValue(null);
          this.fechasSelected=true;
          break;
        }
        case "Medios": {
          this.filtroForm.get('medio')?.setValidators(Validators.required);
          this.filtroForm.get('medio')?.setValue(null);
          this.medioSelected = true;
          break;
        }
        case "Titulo": {
          this.filtroForm.get('titulo')?.setValidators(Validators.required);
          this.filtroForm.get('titulo')?.setValue(null);
          this.tituloSelected = true;
          break;
        }
        case "Tipo": {
          this.filtroForm.get('tipo')?.setValidators(Validators.required);
          this.filtroForm.get('tipo')?.setValue(null);
          this.tipoSelected = true;
          break;
        }
        case "Estado": {
          this.filtroForm.get('estado')?.setValidators(Validators.required);
          this.filtroForm.get('estado')?.setValue(null);
          this.estadoSelected = true;
          break;
        }
        case "Redactor": {
          this.filtroForm.get('redactor')?.setValidators(Validators.required);
          this.filtroForm.get('redactor')?.setValue(null);
          this.redactorSelected = true;
          break;
        }
        case "Destinatario": {
          this.filtroForm.get('destinatario')?.setValidators(Validators.required);
          this.filtroForm.get('destinatario')?.setValue(null);
          this.destinatarioSelected = true;
          break;
        }
      }
      await new Promise(f => setTimeout(f, 60));
    });
  }

  filtrar() {
    var filtrosElegidos = this.filtroForm.get('filtros')?.value;
    var anunciosAFiltrar = this.anuncios;
    var anunciosEncontrados = true;
    filtrosElegidos.forEach(async (element: any) => {

      switch (element.item_id) {
        case "Fechas": {
          var fechaInicio = this.filtroForm.get('fechaStart')?.value;
          var fechaFin = this.filtroForm.get('fechaEnd')?.value;
          await new Promise(f => setTimeout(f, 30));
          // this.destinatarios = this.destinatarios.filter(o => { return o.areaAsignada._id === area._id }).slice();
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.fechaCreacion > fechaInicio && o.fechaCreacion < fechaFin });
          break;
        }
        case "Medios": { //El unico que dudo si funcara o no :c
          var medioElegido = this.filtroForm.get('medio')?.value;
          var anuncios = new Array<Anuncio>();

          anunciosAFiltrar.forEach((anuncio: Anuncio) => {
            anuncio.medios.forEach(element => {
              if (element == medioElegido) {
                anuncios.push(anuncio);
              }
            });
          });
          await new Promise(f => setTimeout(f, 90));
          anunciosAFiltrar = anuncios;
          await new Promise(f => setTimeout(f, 90));
          break;
        }
        case "Titulo": {
          var titulo = this.filtroForm.get('titulo')?.value;
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.titulo == titulo });
          break;
        }
        case "Tipo": {
          var tipo = this.filtroForm.get('tipo')?.value;
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.tipo == tipo });
          break;
        }
        case "Estado": {
          var estado = this.filtroForm.get('estado')?.value;
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.estado == estado });
          break;
        }
        case "Redactor": {
          var redactor = this.filtroForm.get('redactor')?.value;//valor ID
          await new Promise(f => setTimeout(f, 30));
          anunciosAFiltrar = anunciosAFiltrar.filter(o => { return o.redactor._id == redactor });
          break;
        }
        case "Destinatario": {
          var destinatario = this.filtroForm.get('destinatario')?.value;//valor ID
          await new Promise(f => setTimeout(f, 30));
          var anuncios = new Array<Anuncio>();

          anunciosAFiltrar.forEach((anuncio: Anuncio) => {
            anuncio.destinatarios.forEach(element => {
              if ( element == destinatario) {
                anuncios.push(anuncio);
              }
            });
          });
          await new Promise(f => setTimeout(f, 90));
          anunciosAFiltrar = anuncios;
          await new Promise(f => setTimeout(f, 90));
          break;
        }
      }
      await new Promise(f => setTimeout(f, 80));
    });

  }


  ngOnInit(): void {
  }

}
