import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './home/funcionario/funcionario.component';
import { ListaClienteComponent } from './login/atendente/lista-cliente/lista-cliente.component';
import { VeterinarioComponent } from './login/veterinario/veterinario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'atendente/lista-cliente',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: FuncionarioComponent,
  },
  {
    path: 'atendente/lista-cliente',
    component: ListaClienteComponent,
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
