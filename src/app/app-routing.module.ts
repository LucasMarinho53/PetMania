import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CadastrarClienteComponent } from './cliente/cadastrar-cliente/cadastrar-cliente.component'
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component'
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente/lista-cliente',
    pathMatch: 'full',
  },
  {
    path: 'cliente/lista-cliente',
    component: ListarClienteComponent,
  },
  {
    path: 'cliente/cadastrar-cliente',
    component: CadastrarClienteComponent,
  },
  {
    path: 'cliente/editar-cliente',
    component: EditarClienteComponent,
  },
  { path: 'cliente/editar-cliente/:id', component: EditarClienteComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
