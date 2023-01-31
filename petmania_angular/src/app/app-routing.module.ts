import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './home/funcionario/funcionario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/home/funcionario',
    pathMatch: 'full',
  },
  {
    path: 'app/home/funcionario',
    component: FuncionarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
