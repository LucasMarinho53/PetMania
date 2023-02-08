import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Dono } from 'src/app/models/dono.model'
import { Raca } from 'src/app/models/raca.model'
import { AnimalService } from 'src/app/services/animal.service'

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.css'],
})
export class EditarAnimalComponent {
  animalForm!: FormGroup
  animal: Animal = new Animal()
  id!: number
  id_especie!: number
  dono!: Dono[]
  racas!: Raca[]
  isActive = false;

  idAnimal!: number
  nome_raca!: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    const id_especie = this.route.snapshot.paramMap.get('id_especie')
    // console.log(`${id} - ${id_especie}`)
    if (id && id_especie) {
      this.id = +id
      this.id_especie = +id_especie

      this.animalService.getRaceList(this.id_especie).subscribe({
        next: (res) => {
          // console.log(res)
          this.racas = res
        },
      })

      this.animalService.getAnimalById(+id).subscribe({
        next: (res) => {
          console.log(res)
          this.animalForm = this.formBuilder.group({
            nome_animal: [res.nome_animal, Validators.required],
            sexo_animal: [res.sexo_animal, Validators.required],
            data_nasc: [res.data_nasc, Validators.required],
            id_raca: [res.id_raca, Validators.required],
            id_animal: [this.id, Validators.required],
          })
        },
        error: (e) => {
          console.error(e)
        },
      })

    }else{

    }
  }

  updateAnimal() {
    const animal = this.animalForm.value as Animal
    // console.log(animal);
      this.animalService.updateAnimal(animal).subscribe((response) => {
        // console.log(response)
        this.router.navigate(['atendente/lista-animal'])
      })
  }
}
