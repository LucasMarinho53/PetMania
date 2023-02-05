import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FuncionarioComponent } from './home/funcionario/funcionario.component'
import { AtendenteComponent } from './login/atendente/atendente.component'
import { CadastraClienteComponent } from './login/atendente/cliente/cadastra-cliente/cadastra-cliente.component'
import { ListaClienteComponent } from './login/atendente/cliente/lista-cliente/lista-cliente.component'
import { VeterinarioComponent } from './login/veterinario/veterinario.component'
import { ClienteService } from './services/cliente.service'

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioComponent,
    AtendenteComponent,
    ListaClienteComponent,
    CadastraClienteComponent,
    VeterinarioComponent,
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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
