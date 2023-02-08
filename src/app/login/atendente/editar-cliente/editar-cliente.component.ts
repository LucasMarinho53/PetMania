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
  isActive = false;
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

      this.clientService.getClientById(+id).subscribe({
        next: (res) => {
          this.clientForm = this.formBuilder.group({
            id_dono: [res.id_dono, Validators.required],
            nome: [res.nome, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ùÂ-û ]+$/), Validators.minLength(4), Validators.maxLength(50)]],
            cpf: [res.cpf, [Validators.required, Validators.pattern('[0-9]{11}')]],
            email: [res.email, [Validators.required, Validators.email]],
            telefone: [res.telefone, [Validators.required, Validators.pattern(/^\d{11}$/)]],
            endereco: this.formBuilder.group({
              id_end: [res.id_end, Validators.required],
              cidade: [res.cidade, [Validators.required]],
              bairro: [res.bairro, [Validators.required]],
              logradouro: [res.logradouro, [Validators.required]],
              cep: [res.cep, [Validators.required, Validators.pattern('[0-9]{8}')]],
              numero: [res.numero, [Validators.required, , Validators.pattern('[0-9]+')]],
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
    this.clientService.updateClient(dono).subscribe(() => {
      this.router.navigate(['atendente/lista-cliente'])
    })
  }
}
