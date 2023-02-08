import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, } from '@angular/fire/auth-guard';

import { CadastraClienteComponent } from './login/atendente/cadastra-cliente/cadastra-cliente.component';
import { ListaClienteComponent } from './login/atendente/lista-cliente/lista-cliente.component';

import { ListaAnimalComponent } from './login/atendente/lista-animal/lista-animal.component';
import { ListaConsultaComponent } from './login/atendente/lista-consulta/lista-consulta.component';
import { ListaFichaComponent } from './login/veterinario/lista-ficha/lista-ficha.component';
import { AuthComponent } from './login/auth/auth.component';
import { EditarClienteComponent } from './login/atendente/editar-cliente/editar-cliente.component';
import { CadastrarAnimalComponent } from './login/atendente/cadastrar-animal/cadastrar-animal.component';
import { EditarAnimalComponent } from './login/atendente/editar-animal/editar-animal.component';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(('auth'));
const redirectLoggedInToHome = () => redirectLoggedInTo(('atendente/lista-cliente'));

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    component: AuthComponent, ...canActivate(redirectLoggedInToHome),

  },
  {
    path: 'atendente/lista-cliente',
    component: ListaClienteComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'atendente/cadastrar-animal/:id/:id_especie',
    component: CadastrarAnimalComponent,
  },
  {
    path: 'atendente/lista-animal',
    component: ListaAnimalComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'atendente/editar-animal/:id/:id_especie',
    component: EditarAnimalComponent,
  },
  {
    path: 'atendente/editar-animal',
    component: EditarAnimalComponent,
  },
  {
    path: 'atendente/lista-consulta',
    component: ListaConsultaComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'cadastrar-cliente',
    component: CadastraClienteComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'editar-cliente',
    component: EditarClienteComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'editar-cliente/:id',
    component: EditarClienteComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'lista-ficha',
    component: ListaFichaComponent, ...canActivate(redirectUnauthorizedToLogin)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
