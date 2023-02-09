import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Dono } from 'src/app/models/dono.model'
import { Raca } from 'src/app/models/raca.model'
import { Veterinario } from 'src/app/models/veterinario.model'
import { AnimalService } from 'src/app/services/animal.service'

@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrls: ['./cadastrar-consulta.component.css'],
})
export class CadastrarConsultaComponent implements OnInit {
  animalForm!: FormGroup
  consultaForm!: FormGroup

  animal: Animal = new Animal()
  id!: number
  id_especie!: number
  dono!: Dono[]
  racas!: Raca[]

  isActive = false;
  nm_animal!: string | null
  idAnimal!: number | null

  nome_raca!: string

  veterinario!: Veterinario[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const idAnimal = this.route.snapshot.paramMap.get('id')
    const nm_animal = this.route.snapshot.paramMap.get('id2')
    // console.log(`${idAnimal} - ${nm_animal}`)
    if (idAnimal && nm_animal) {
      this.idAnimal = +idAnimal
      this.nm_animal = nm_animal
      // console.log(`${this.idAnimal} - ${this.nm_animal}`)
    }

    this.animalService.getVeterinario().subscribe({
      next: (res) => {
        // console.log(res)
        this.veterinario = res
      },
      error: (e) => {
        console.error(e)
      },
    })

    // this.animalForm = this.formBuilder.group({
    //   nome_animal: [this.nm_animal, Validators.required],
    //   sexo_animal: ['', Validators.required],
    //   data_nasc: ['', Validators.required],
    //   id_animal: ['', Validators.required],
    //   veterinarios: this.formBuilder.group({
    //     id_vet: ['', Validators.required]
    //   })
    // })

    this.consultaForm = this.formBuilder.group({
      id_animal: [this.idAnimal, Validators.required],
      id_vet: ['', Validators.required],
      motivo: ['', Validators.required],
      nome_animal: [this.nm_animal, Validators.required],
    })
  }

  registerConsulta() {
    this.animalService.registerConsulta(this.consultaForm.value).subscribe((response) => {
      console.log(response)
      this.router.navigate(['atendente/listar-consulta'])
    })
  }
}
