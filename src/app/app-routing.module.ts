import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, } from '@angular/fire/auth-guard';

import { FuncionarioComponent } from './home/funcionario/funcionario.component';
import { CadastraClienteComponent } from './login/atendente/cadastra-cliente/cadastra-cliente.component';
import { ListaClienteComponent } from './login/atendente/lista-cliente/lista-cliente.component';
import { AuthComponent } from './login/atendente/auth/auth.component';
import { ListaAnimalComponent } from './login/atendente/lista-animal/lista-animal.component';
import { ListaConsultaComponent } from './login/atendente/lista-consulta/lista-consulta.component';
import { ListaFichaComponent } from './login/veterinario/lista-ficha/lista-ficha.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(('atendente/auth'));
const redirectLoggedInToHome = () => redirectLoggedInTo(('atendente/lista-cliente'));

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: FuncionarioComponent,
  },
  {
    path: 'atendente/auth',
    component: AuthComponent, ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'atendente/lista-cliente',
    component: ListaClienteComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'atendente/lista-animal',
    component: ListaAnimalComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'atendente/lista-consulta',
    component: ListaConsultaComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'cadastrar-cliente',
    component: CadastraClienteComponent,
  },
  {
    path: 'lista-ficha',
    component: ListaFichaComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
