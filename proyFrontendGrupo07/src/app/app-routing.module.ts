import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
/*
{ path: 'anuncios/crear', component:  },
{ path: 'anuncios/ver', component:  },
{ path: 'anuncios/buscar', component:  },
{ path: 'anuncios/autorizar', component:  },
{ path: 'anuncios/programa', component:  },
{ path: '**', component: },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
