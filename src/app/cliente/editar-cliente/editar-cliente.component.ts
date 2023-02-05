import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Dono } from 'src/app/models/dono.model'
import { ClienteService } from 'src/app/services/cliente.service'

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  clientForm!: FormGroup
  id!: number
  dono!: Dono

  constructor(
    private clientService: ClienteService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.id = +id
      // console.log(id)

      this.clientService.getDonoById(+id).subscribe({
        next: (res) => {
          // console.log(res)
          this.clientForm = this.formBuilder.group({
            nome: [res.nome, Validators.required],
            cpf: [res.cpf, Validators.required],
            email: [res.email, [Validators.required, Validators.email]],
            telefone: [res.telefone, Validators.required],
            endereco: this.formBuilder.group({
              cidade: [res.cidade, Validators.required],
              bairro: [res.bairro, Validators.required],
              logradouro: [res.logradouro, Validators.required],
              cep: [res.cep, Validators.required],
              numero: [res.numero, Validators.required],
            }),
          })
        },
        error: (e) => {
          console.error(e)
        },
      })
    } else {
    }
  }

  editCliente() {
    const dono = this.clientForm.value as Dono
    this.clientService.editarDono(dono).subscribe((data) => {
      // console.log(data)
      this.router.navigate(['cliente/lista-cliente'])
    })
  }
}
