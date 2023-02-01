import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClienteComponent implements OnInit {
  clientForm!: FormGroup

  constructor(formBuilder: FormBuilder) {}

  ngOnInit() {
    this.clientForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),

      endereco: new FormGroup({
      cep: new FormControl('', [Validators.required]),
      localidade: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      }),
    })
  }

  onSubmit() {
    console.log(this.clientForm!.value)
  }
}
