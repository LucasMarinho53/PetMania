import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './home/funcionario/funcionario.component';
import { AtendenteComponent } from './login/atendente/atendente.component';
import { VeterinarioComponent } from './login/veterinario/veterinario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/home/funcionario',
    pathMatch: 'full',
  },
  {
    path: 'app/home/funcionario',
    component: FuncionarioComponent,
  },
  {
    path: 'app/login/atendente',
    component: AtendenteComponent,
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
