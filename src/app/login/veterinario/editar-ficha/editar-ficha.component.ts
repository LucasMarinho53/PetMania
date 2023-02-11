import { Component, OnInit } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Consulta } from 'src/app/models/consulta.model'
import { Dono } from 'src/app/models/dono.model'
import { Funcionario } from 'src/app/models/funcionario.model'
import { Raca } from 'src/app/models/raca.model'
import { AuthService } from 'src/app/services/auth.service'
import { ConsultaService } from 'src/app/services/consulta.service'
import { FirebaseService } from 'src/app/services/firebase.service'

@Component({
  selector: 'app-editar-ficha',
  templateUrl: './editar-ficha.component.html',
  styleUrls: ['./editar-ficha.component.css']
})
export class EditarFichaComponent {

  consultaForm!: FormGroup
  animal: Animal = new Animal()
  id!: number
  id_especie!: number
  dono!: Dono[]
  racas!: Raca[]
  usuario!:Funcionario
  isActive = false;

  consultas!: Consulta[]

  id_ficha!: number
  nome_animal!: string
  veterinario!: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private consultaService: ConsultaService,
    private formBuilder: FormBuilder,
    private auth: Auth,
    private firebaseService: FirebaseService,
    private fireAuth:AuthService
  ) {}

  ngOnInit() {
    const id_ficha = this.route.snapshot.paramMap.get('id_ficha')
    const nome_animal = this.route.snapshot.paramMap.get('nome_animal')
    const veterinario = this.route.snapshot.paramMap.get('veterinario')
    // console.log(`${id} - ${id_especie}`)
    if (id_ficha && nome_animal && veterinario) {
      this.id_ficha = +id_ficha
      this.nome_animal = nome_animal
      this.veterinario = veterinario
      // console.log(`${this.id_ficha} - ${this.nome_animal} - ${this.veterinario}`)

      // this.animalService.getFichaId(this.id_ficha).subscribe({
      //   next: (res) => {
      //     // console.log(res);
      //     this.consultas = res;
      //     console.log(this.consultas)
      //   },
      //   error: (e) => {
      //     console.error(e)
      //   },
      // })

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

      this.consultaService.getFichaId(+id_ficha).subscribe({
        next: (res) => {
          this.consultaForm = this.formBuilder.group({
            id_ficha: [this.id_ficha, Validators.required],
            nome_animal: [this.nome_animal, Validators.required],
            data_visita: [res.data_visita, Validators.required],
            veterinario: [this.veterinario, Validators.required],
            motivo: [res.motivo_visita, Validators.required],
            diagnostico: [res.diagnostico, Validators.required],
            tratamento: [res.tratamento, Validators.required],
            prescricao: [res.prescricao, Validators.required],
            observacoes: [res.observacoes, Validators.required],
            id_animal: [res.id_animal, Validators.required],
          })
        },
        error: (e) => {
          console.error(e)
        },
      })
    } else {
    }
  }

  updateFicha() {
    const cons = this.consultaForm.value as Consulta
    // console.log(animal);
    this.consultaService.updateFicha(cons).subscribe((response) => {
      // console.log(response)
      this.router.navigate(['lista-ficha'])
    })
  }
}
