import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Dono } from 'src/app/models/dono.model'
import { Raca } from 'src/app/models/raca.model'
import { AnimalService } from 'src/app/services/animal.service'

@Component({
  selector: 'app-listar-consulta',
  templateUrl: './listar-consulta.component.html',
  styleUrls: ['./listar-consulta.component.css'],
})
export class ListarConsultaComponent implements OnInit{
  searchForm!: FormGroup
  animais!: Animal[]
  racas!: Raca[]
  donos!: Dono[]
  isActive = false;

  constructor(
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchValue: new FormControl('', [Validators.required]),
    })
    this.getAnimal()
  }

  getAnimal() {
    this.animalService.getAnimal(this.searchForm.value.searchValue).subscribe({
      next: (res) => {
        // console.log(res)
        this.animais = res
      },
    })
  }

  redirectToClientList() {
    this.router.navigate(['cliente/lista-cliente'])
  }

  redirectToAnimalList() {
    this.router.navigate(['animal/listar-animal'])
  }

  redirectToConsultaRegister(idAnimal: number | undefined, nome_animal: string) {
    this.router.navigate(['consulta/cadastrar-consulta', idAnimal, nome_animal])
  }

  redirectToAnimalEdit(id: number | undefined, id_especie: number | undefined) {
    this.router.navigate(['animal/editar-animal', id, id_especie])
  }
}
