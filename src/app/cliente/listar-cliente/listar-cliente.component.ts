import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Dono } from 'src/app/models/dono.model'
import { ClienteService } from 'src/app/services/cliente.service'

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'],
})
export class ListarClienteComponent implements OnInit {
  isActive = false
  searchForm!: FormGroup
  donos!: Dono[]

  constructor(
    private clientService: ClienteService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchValue: new FormControl('', [Validators.required]),
    })
    this.getClients();
  }

  getClients() {
    this.clientService.getClient(this.searchForm.value.searchValue).subscribe({
      next: (res) => {
        this.donos = res
      },
      error: (e) => {
        console.error(e)
      },
    })
  }

  redirectToClientRegister(){
    this.router.navigateByUrl('cliente/cadastra-cliente')
  }

  redirectToClientEdit(id: number | undefined) {
    this.router.navigate(['cliente/editar-cliente', id]);
  }

}
