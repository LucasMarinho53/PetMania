import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { AnimalService } from 'src/app/services/animal.service'

@Component({
  selector: 'app-listar-animal',
  templateUrl: './listar-animal.component.html',
  styleUrls: ['./listar-animal.component.css'],
})
export class ListarAnimalComponent implements OnInit {
  searchForm!: FormGroup
  animais!: Animal[]

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
        this.animais = res;
      },
    })
  }

  redirectToAnimalEdit(id: number | undefined) {
    this.router.navigate(['cliente/editar-cliente', id])
  }

  redirectToClientList() {
    this.router.navigate(['cliente/lista-cliente'])
  }

  redirectToAnimalList() {
    this.router.navigate(['animal/listar-animal'])
  }
}
