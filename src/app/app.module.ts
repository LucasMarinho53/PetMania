import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionarioComponent } from './home/funcionario/funcionario.component';
import { AtendenteComponent } from './login/atendente/atendente.component';
import { ListaClienteComponent } from './login/atendente/lista-cliente/lista-cliente.component';
import { VeterinarioComponent } from './login/veterinario/veterinario.component';

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioComponent,
    AtendenteComponent,
    VeterinarioComponent,
    ListaClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
