import { Component, OnInit } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Consulta } from 'src/app/models/consulta.model'
import { Dono } from 'src/app/models/dono.model'
import { Funcionario } from 'src/app/models/funcionario.model'
import { Raca } from 'src/app/models/raca.model'
import { AnimalService } from 'src/app/services/animal.service'
import { AuthService } from 'src/app/services/auth.service'
import { FirebaseService } from 'src/app/services/firebase.service'

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
  consultas!: Consulta[]
  isActive = false;
  usuario!:Funcionario

  constructor(
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth,
    private fireAuth:AuthService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchValue: new FormControl('', [Validators.required]),
    })
    this.getAnimal(),
    this.getConsulta()

    if(this.auth.currentUser!.email)
      {
        this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
          next:(res)=>{
            this.usuario = res
            if (res.cargo !== 1){
              this.fireAuth.logout().then(()=>{
                this.router.navigateByUrl('auth')
                window.location.reload();
              }

              )
            }
          },

          error:(err)=>console.log(err)

        })

      }
  }

  getAnimal() {
    this.animalService.getAnimal(this.searchForm.value.searchValue).subscribe({
      next: (res) => {
        // console.log(res)
        this.animais = res
      },
    })
  }

  getConsulta() {
    this.animalService.getConsulta(this.searchForm.value.searchValue).subscribe({
      next: (res) => {
        console.log(res)
        this.consultas = res
        console.log(this.consultas)
        // this.animais = res
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

  redirectToServices(id_ficha: number, nome_animal: string) {
    this.router.navigate(['atendente/cadastrar-servico', id_ficha, nome_animal])
  }
}
