import { Component, OnInit } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Funcionario } from 'src/app/models/funcionario.model'
import { AnimalService } from 'src/app/services/animal.service'
import { AuthService } from 'src/app/services/auth.service'
import { FirebaseService } from 'src/app/services/firebase.service'

@Component({
  selector: 'app-lista-animal',
  templateUrl: './lista-animal.component.html',
  styleUrls: ['./lista-animal.component.css'],
})
export class ListaAnimalComponent implements OnInit {
  usuario!: Funcionario
  isActive = false
  searchForm!: FormGroup
  animais!: Animal[]

  constructor(
    private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router,
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private fireAuth: AuthService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: new FormControl('', [Validators.required]),
    })
    this.getAnimal()
    // console.log(this.auth.currentUser?.email)
    if (this.auth.currentUser!.email) {
      this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
        next: (res) => {
          this.usuario = res
          if (res.cargo !== 1) {
            this.fireAuth.logout().then(() => {
              this.router.navigateByUrl('auth')
              window.location.reload()
            })
          }
        },

        error: (err) => console.log(err),
      })
    }
  }
  getAnimal() {
    this.animalService.getAnimal(this.searchForm.value.searchValue).subscribe({
      next: (res) => {
        this.animais = res
      },
    })
  }

  redirectToAnimalEdit(id: number | undefined, id_especie: number | undefined) {
    this.router.navigate(['atendente/editar-animal', id, id_especie])
  }

  redirectToClientList() {
    this.router.navigate(['atendente/lista-cliente'])
  }

  redirectToAnimalList() {
    this.router.navigate(['atendente/lista-animal'])
  }

  redirectToConsultaRegister(idAnimal: number | undefined, nome_animal: string) {
    this.router.navigate(['atendente/cadastrar-consulta', idAnimal, nome_animal])
  }
}
