import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Dono } from 'src/app/models/dono.model'
import { Raca } from 'src/app/models/raca.model'
import { Servico } from 'src/app/models/servico.model'
import { ServicoCadastrar } from 'src/app/models/servicoCadastrar.model'
import { ServicoListarConsulta } from 'src/app/models/servicoListarConsulta.model'
import { AnimalService } from 'src/app/services/animal.service'

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.component.html',
  styleUrls: ['./cadastrar-servico.component.css'],
})
export class CadastrarServicoComponent {
  servicosForm!: FormGroup
  id_ficha!: number
  nome_animal!: string
  servicos!: Servico[]
  servicoListar!: ServicoListarConsulta[]
  isActive = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id_ficha = this.route.snapshot.paramMap.get('id_ficha')
    const nome_animal = this.route.snapshot.paramMap.get('nome_animal')
    // console.log(`${id} - ${id_especie}`)
    if (id_ficha && nome_animal) {
      this.id_ficha = +id_ficha
      this.nome_animal = nome_animal

      this.animalService.getServico().subscribe({
        next: (res) => {
          // console.log(res)
          this.servicos = res
          // console.log(this.servicos)
        },
      })

      this.servicosForm = this.formBuilder.group({
        id_ficha: [this.id_ficha, Validators.required],
        id_servico: ['', Validators.required],
      })

      this.listarServicosFicha()
    } else {
    }
  }

  redirectToClientList() {
    this.router.navigate(['atendente/lista-cliente'])
  }

  redirectToAnimalList() {
    this.router.navigate(['atendente/listar-animal'])
  }

  redirectToConsultList() {
    this.router.navigate(['atendente/listar-consulta'])
  }

  registerServico() {
    const serv = this.servicosForm.value as ServicoCadastrar
    // console.log(serv)
    this.animalService.registerServico(serv).subscribe({
      next: () => {
        this.listarServicosFicha()
      },
      error: (e) => {
        console.error(e)
      },
    })
  }

  listarServicosFicha(){
    this.animalService.getServicoList(this.id_ficha).subscribe({
      next: (res) => {
        this.servicoListar = res
        // console.log(this.servicoListar)
      },
    })
  }

  removeService(id_servico:number) {
    const serv = new ServicoCadastrar
    serv.id_ficha = this.id_ficha
    serv.id_servico = id_servico
    // console.log(serv);
    this.animalService.removerServico(serv).subscribe({
      next: (res) => {
        this.listarServicosFicha()
      },
    })
  }
}
