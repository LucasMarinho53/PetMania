import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ClienteService } from 'src/app/services/cliente.service'

import { CadastraClienteComponent } from './cadastra-cliente.component'

@NgModule({
  declarations: [CadastraClienteComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [ClienteService],
})
export class CadastraClienteModule {}
