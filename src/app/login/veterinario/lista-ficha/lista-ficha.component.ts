import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Animal } from 'src/app/models/animal.model'
import { Consulta } from 'src/app/models/consulta.model'
import { Dono } from 'src/app/models/dono.model'
import { Raca } from 'src/app/models/raca.model'
import { AnimalService } from 'src/app/services/animal.service'


@Component({
  selector: 'app-lista-ficha',
  templateUrl: './lista-ficha.component.html',
  styleUrls: ['./lista-ficha.component.css']
})
export class ListaFichaComponent implements OnInit{
  usuario!:Funcionario
  isActive = false;
  searchForm!: FormGroup
  animais!: Animal[]
  racas!: Raca[]
  donos!: Dono[]
  consultas!: Consulta[]

  constructor( private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private auth: Auth,
    private router: Router,
    private fireAuth:AuthService
    ){}

    ngOnInit(): void {

      this.searchForm = this.formBuilder.group({
        searchValue: new FormControl('', [Validators.required]),
      })
      this.getAnimal()
      this.getConsulta()

      console.log(this.auth.currentUser?.email);




      if(this.auth.currentUser!.email)
      {
        this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
          next:(res)=>{
            this.usuario = res
            if (res.cargo !== 2){
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

    getConsulta() {
      this.animalService.getConsulta(this.searchForm.value.searchValue).subscribe({
        next: (res) => {
          // console.log(res)
          this.consultas = res
          // console.log(this.consultas)
          // this.animais = res
        },
      })
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
      this.router.navigate(['atendente/lista-cliente'])
    }

    redirectToAnimalList() {
      this.router.navigate(['atendente/listar-animal'])
    }

    redirectToConsultList() {
      this.router.navigate(['atendente/listar-consulta'])
    }

    redirectToConsultaRegister(idAnimal: number | undefined, nome_animal: string) {
      this.router.navigate(['atendente/cadastrar-consulta', idAnimal, nome_animal])
    }

    redirectToEditConsult(id_ficha: number, nome_animal: string, veterinario: string) {
      this.router.navigate(['veterinario/editar-ficha', id_ficha, nome_animal, veterinario])
    }
  }
