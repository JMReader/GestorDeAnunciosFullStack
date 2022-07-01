import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrearanuncioComponent } from './components/crearanuncio/crearanuncio.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { ListaranunciosComponent } from './components/listaranuncios/listaranuncios.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { CrearempleadoComponent } from './components/crearempleado/crearempleado.component';
import { NgMultiSelectDropDownModule, } from 'ng-multiselect-dropdown';
import { FacebookModule } from 'ngx-facebook';
import { CrearareaComponent } from './components/creararea/creararea.component';
import { CrearrolComponent } from './components/crearrol/crearrol.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CrearanuncioComponent,
    LoginComponent,
    ListaranunciosComponent,
    CrearempleadoComponent,
    CrearareaComponent,
    CrearrolComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlifeFileToBase64Module,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FacebookModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
