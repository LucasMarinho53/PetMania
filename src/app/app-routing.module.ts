import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { FuncionarioComponent } from './home/funcionario/funcionario.component'
import { AtendenteComponent } from './login/atendente/atendente.component'
import { CadastraClienteComponent } from './login/atendente/cliente/cadastra-cliente/cadastra-cliente.component'
import { EditarClienteComponent } from './login/atendente/cliente/editar-cliente/editar-cliente.component'
import { ListaClienteComponent } from './login/atendente/cliente/lista-cliente/lista-cliente.component'
import { VeterinarioComponent } from './login/veterinario/veterinario.component'

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
    path: 'cliente/editar-cliente',
    component: EditarClienteComponent,
  },
  { path: 'cliente/editar-cliente/:id', component: EditarClienteComponent },
  {
    path: 'veterinario',
    component: VeterinarioComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
