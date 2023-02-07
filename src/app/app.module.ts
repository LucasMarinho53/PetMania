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

import { ListaClienteComponent } from './login/atendente/lista-cliente/lista-cliente.component';
import { SidenavComponent } from './login/atendente/sidenav/sidenav.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AuthComponent } from './login/auth/auth.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';
import { ListaAnimalComponent } from './login/atendente/lista-animal/lista-animal.component';
import { ListaConsultaComponent } from './login/atendente/lista-consulta/lista-consulta.component';
import { ListaFichaComponent } from './login/veterinario/lista-ficha/lista-ficha.component';
import { SidenavVetComponent } from './login/veterinario/sidenav-vet/sidenav-vet.component'
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { EditarClienteComponent } from './login/atendente/editar-cliente/editar-cliente.component';
import { CadastraClienteComponent } from './login/atendente/cadastra-cliente/cadastra-cliente.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    ListaClienteComponent,
    SidenavComponent,
    AuthComponent,
    ListaAnimalComponent,
    ListaConsultaComponent,
    ListaFichaComponent,
    SidenavVetComponent,
    EditarClienteComponent,
    CadastraClienteComponent
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
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }