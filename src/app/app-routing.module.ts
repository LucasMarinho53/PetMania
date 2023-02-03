import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, } from '@angular/fire/auth-guard';

import { FuncionarioComponent } from './home/funcionario/funcionario.component';
import { CadastraClienteComponent } from './login/atendente/cadastra-cliente/cadastra-cliente.component';
import { ListaClienteComponent } from './login/atendente/lista-cliente/lista-cliente.component';
import { VeterinarioComponent } from './login/veterinario/veterinario.component';
import { AuthComponent } from './login/atendente/auth/auth.component';

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
    path: 'veterinario',
    component: CadastraClienteComponent,
  },
  {
    path: 'app/login/veterinario',
    component: VeterinarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
