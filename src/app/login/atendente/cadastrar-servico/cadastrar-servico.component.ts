import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Dono } from 'src/app/models/dono.model'
import { Raca } from 'src/app/models/raca.model'
import { Servico } from 'src/app/models/servico.model'
import { ServicoCadastrar } from 'src/app/models/servicoCadastrar.model'
import { AnimalService } from 'src/app/services/animal.service'

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.component.html',
  styleUrls: ['./cadastrar-servico.component.css'],
})
export class CadastrarServicoComponent {
  // animalForm!: FormGroup
  servicosForm!: FormGroup

  animal: Animal = new Animal()
  id_ficha!: number
  nome_animal!: string
  dono!: Dono[]
  racas!: Raca[]
  servicos!: Servico[]
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
          this.servicos = res;
          // console.log(this.servicos)
        },
      })

      this.servicosForm = this.formBuilder.group({
        id_ficha: [this.id_ficha, Validators.required],
        id_servico: ['', Validators.required],
        // data_nasc: [res.data_nasc, Validators.required],
        // id_raca: [res.id_raca, Validators.required],
        // id_animal: [this.id, Validators.required],
      })

      // this.animalService.getRaceList(this.id_especie).subscribe({
      //   next: (res) => {
      //     // console.log(res)
      //     this.racas = res
      //   },
      // })

      // this.animalService.getAnimalById(+id).subscribe({
      //   next: (res) => {
      //     // console.log(res)
      //     this.animalForm = this.formBuilder.group({
      //       nome_animal: [res.nome_animal, Validators.required],
      //       sexo_animal: [res.sexo_animal, Validators.required],
      //       data_nasc: [res.data_nasc, Validators.required],
      //       id_raca: [res.id_raca, Validators.required],
      //       id_animal: [this.id, Validators.required],
      //     })
      //   },
      //   error: (e) => {
      //     console.error(e)
      //   },
      // })
    } else {
    }
  }

  redirectToClientList() {
    this.router.navigate(['cliente/lista-cliente'])
  }

  redirectToAnimalList() {
    this.router.navigate(['animal/listar-animal'])
  }

  redirectToConsultList() {
    this.router.navigate(['consulta/listar-consulta'])
  }

  registerServico(){
    const serv = this.servicosForm.value as ServicoCadastrar
    // console.log(serv)
    this.animalService.registerServico(serv).subscribe({
      next: () => {
        this.router.navigate(['consulta/listar-consulta'])
      },
      error: (e) => {
        console.error(e)
      },
    })
  }

  // get idServ(){ return this.servicosForm.get().value}
}
