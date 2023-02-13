import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo, } from '@angular/fire/auth-guard';

import { NgModule } from '@angular/core';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(('login'));
const redirectLoggedInToHome = () => redirectLoggedInTo(('perfil'));

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule), ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule), ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'prontuario', title:"PetMania - Prontuário",
    loadChildren: () => import('./prontuario/prontuario.module').then( m => m.ProntuarioPageModule), ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
