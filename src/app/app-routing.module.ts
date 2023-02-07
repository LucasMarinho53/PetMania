import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CadastrarAnimalComponent } from './animal/cadastrar-animal/cadastrar-animal.component'
import { ListarAnimalComponent } from './animal/listar-animal/listar-animal.component'
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
  {
    path: 'animal/listar-animal',
    component: ListarAnimalComponent,
  },
  {
    path: 'animal/cadastrar-animal',
    component: CadastrarAnimalComponent,
  },
  {
    path: 'animal/cadastrar-animal/:id/:id_especie',
    component: CadastrarAnimalComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
