import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { environment } from 'src/environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CadastrarClienteComponent } from './cliente/cadastrar-cliente/cadastrar-cliente.component'
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component'
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component'
import { ClienteService } from './services/cliente.service'

@NgModule({
  declarations: [
    AppComponent,
    CadastrarClienteComponent,
    ListarClienteComponent,
    EditarClienteComponent,
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
    ReactiveFormsModule,
    provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore())
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
