import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuncionarioComponent } from './home/funcionario/funcionario.component';
import { AtendenteComponent } from './login/atendente/atendente.component';
import { CadastraClienteComponent } from './login/atendente/cliente/cadastra-cliente/cadastra-cliente.component';
import { ListaClienteComponent } from './login/atendente/cliente/lista-cliente/lista-cliente.component';
import { VeterinarioComponent } from './login/veterinario/veterinario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente/lista-cliente',
    pathMatch: 'full',
  },
  {
    path: 'funcionario',
    component: FuncionarioComponent,
  },
  {
    path: 'atendente',
    component: AtendenteComponent,
  },
  {
    path: 'cliente/lista-cliente',
    component: ListaClienteComponent,
  },
  {
    path: 'cliente/cadastra-cliente',
    component: CadastraClienteComponent,
  },
  {
    path: 'veterinario',
    component: VeterinarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
