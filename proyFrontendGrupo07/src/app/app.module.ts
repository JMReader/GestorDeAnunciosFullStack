import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< Updated upstream

=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> Stashed changes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
<<<<<<< Updated upstream
=======
import { CrearanuncioComponent } from './components/crearanuncio/crearanuncio.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
>>>>>>> Stashed changes
import { ListaranunciosComponent } from './components/listaranuncios/listaranuncios.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
<<<<<<< Updated upstream
=======
    CrearanuncioComponent,
    LoginComponent,
>>>>>>> Stashed changes
    ListaranunciosComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< Updated upstream
    AppRoutingModule
=======
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, HttpClientModule

>>>>>>> Stashed changes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
