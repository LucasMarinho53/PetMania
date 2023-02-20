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
export class ListarConsultaComponent implements OnInit {
  idOrder: boolean = true
  especieOrder: boolean = true
  nomeOrder: boolean = true
  vetOrder: boolean = true
  donoOrder: boolean = true
  motivoOrder: boolean = true
  dataOrder: boolean = true

  searchForm!: FormGroup
  animais!: Animal[]
  racas!: Raca[]
  donos!: Dono[]
  consultas!: Consulta[]
  isActive = false
  usuario!: Funcionario

  constructor(
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth,
    private fireAuth: AuthService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchValue: new FormControl('', [Validators.required]),
    })
    this.getAnimal(), this.getConsulta()

    if (this.auth.currentUser!.email) {
      this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
        next: (res) => {
          this.usuario = res
          if (res.cargo != 1) {
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
        // console.log(res)
        this.animais = res
      },
    })
  }

  getConsulta() {
    this.animalService.getConsulta(this.searchForm.value.searchValue).subscribe({
      next: (res) => {
        console.log(res)
        res.sort(this.ordenaPorDataDecrescente)
        this.consultas = res
        console.log(this.consultas)
        // this.animais = res
      },
    })
  }
  ordenaPorDataDecrescente(a: Consulta, b: Consulta) {
    return new Date(b.data_visita).valueOf() - new Date(a.data_visita).valueOf()
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

  redirectToAnimalEdit(id: number | undefined, id_especie: number | undefined) {
    this.router.navigate(['atendente/editar-animal', id, id_especie])
  }

  redirectToServices(id_ficha: number, nome_animal: string) {
    this.router.navigate(['atendente/cadastrar-servico', id_ficha, nome_animal])
  }

  /**Ordena os dados da listagem de acordo com o critério selecionado */
  ordenar(tipoOrdem: number) {
    if (tipoOrdem == 1 && this.idOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        return a.id_ficha - b.id_ficha
      })
      this.idOrder = false
    } else if (tipoOrdem == 1 && !this.idOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        return b.id_ficha - a.id_ficha
      })
      this.idOrder = true
    } else if (tipoOrdem == 2 && this.especieOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.especie > b.especie) {
          return 1
        } else if (b.especie > a.especie) {
          return -1
        } else {
          return 0
        }
      })
      this.especieOrder = false
      console.log(this.especieOrder)
    } else if (tipoOrdem == 2 && !this.especieOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.especie < b.especie) {
          return 1
        } else if (b.especie < a.especie) {
          return -1
        } else {
          return 0
        }
      })
      this.especieOrder = true
    } else if (tipoOrdem == 3 && this.nomeOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.nome_animal > b.nome_animal) {
          return 1
        } else if (b.nome_animal > a.nome_animal) {
          return -1
        } else {
          return 0
        }
      })
      this.nomeOrder = false
    } else if (tipoOrdem == 3 && !this.nomeOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.nome_animal < b.nome_animal) {
          return 1
        } else if (b.nome_animal < a.nome_animal) {
          return -1
        } else {
          return 0
        }
      })
      this.nomeOrder = true
    } else if (tipoOrdem == 4 && this.vetOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.veterinario > b.veterinario) {
          return 1
        } else if (b.veterinario > a.veterinario) {
          return -1
        } else {
          return 0
        }
      })
      this.vetOrder = false
    } else if (tipoOrdem == 4 && !this.vetOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.veterinario < b.veterinario) {
          return 1
        } else if (b.veterinario < a.veterinario) {
          return -1
        } else {
          return 0
        }
      })
      this.vetOrder = true
    } else if (tipoOrdem == 5 && this.donoOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.nome_dono > b.nome_dono) {
          return 1
        } else if (b.nome_dono > a.nome_dono) {
          return -1
        } else {
          return 0
        }
      })
      this.donoOrder = false
      console.log(this.donoOrder)
    } else if (tipoOrdem == 5 && !this.donoOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.nome_dono < b.nome_dono) {
          return 1
        } else if (b.nome_dono < a.nome_dono) {
          return -1
        } else {
          return 0
        }
      })
      console.log(this.donoOrder)

      this.donoOrder = true
    } else if (tipoOrdem == 6 && this.motivoOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.motivo_visita > b.motivo_visita) {
          return 1
        } else if (b.motivo_visita > a.motivo_visita) {
          return -1
        } else {
          return 0
        }
      })
      this.motivoOrder = false
    } else if (tipoOrdem == 6 && !this.motivoOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        if (a.motivo_visita < b.motivo_visita) {
          return 1
        } else if (b.motivo_visita < a.motivo_visita) {
          return -1
        } else {
          return 0
        }
      })

      this.motivoOrder = true
    } else if (tipoOrdem == 7 && this.dataOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        return new Date(a.data_visita).valueOf() - new Date(b.data_visita).valueOf()
      })
      this.dataOrder = false
    } else if (tipoOrdem == 7 && !this.dataOrder) {
      this.consultas.sort((a: Consulta, b: Consulta) => {
        return new Date(b.data_visita).valueOf() - new Date(a.data_visita).valueOf()
      })
      this.dataOrder = true
    }

    //fim metodo
  }
}
