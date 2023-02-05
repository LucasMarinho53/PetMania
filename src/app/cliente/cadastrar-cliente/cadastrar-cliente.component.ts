import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { Dono } from '../../models/dono.model'
import { ClienteService } from '../../services/cliente.service'

@Component({
selector: 'app-cadastrar-cliente',
templateUrl: './cadastrar-cliente.component.html',
styleUrls: ['./cadastrar-cliente.component.css'],
})
export class CadastrarClienteComponent implements OnInit {
clientForm!: FormGroup

constructor(
private formBuilder: FormBuilder,
private clientService: ClienteService,
private router: Router
) {}

ngOnInit() {
this.clientForm = this.formBuilder.group({
nome: ['', Validators.required],
cpf: ['', Validators.required],
email: ['', [Validators.required, Validators.email]],
telefone: ['', Validators.required],
endereco: this.formBuilder.group({
cidade: ['', Validators.required],
bairro: ['', Validators.required],
logradouro: ['', Validators.required],
cep: ['', Validators.required],
numero: ['', Validators.required],
}),
})
}

addCliente() {
const dono = this.clientForm.value as Dono
this.clientService.cadastrarDono(dono).subscribe((data) => {
// console.log(data)
this.router.navigate(['cliente/lista-cliente']);
})
}
}




