import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearanuncioComponent } from './components/crearanuncio/crearanuncio.component';
import { CrearempleadoComponent } from './components/crearempleado/crearempleado.component';
import { ListaranunciosComponent } from './components/listaranuncios/listaranuncios.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
{ path: 'login', component: LoginComponent}, 
{ path: 'anuncios/crear', component: CrearanuncioComponent },
{ path: 'anuncios/ver', component: ListaranunciosComponent  },
/*{ path: 'anuncios/buscar', component:  },
{ path: 'anuncios/autorizar', component:  },
{ path: 'anuncios/programa', component:  },
{ path: '**', component: },*/
{ path: 'empleado/crear', component: CrearempleadoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
