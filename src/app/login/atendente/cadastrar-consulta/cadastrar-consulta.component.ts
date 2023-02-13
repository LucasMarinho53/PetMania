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
import { Veterinario } from 'src/app/models/veterinario.model'
import { AnimalService } from 'src/app/services/animal.service'
import { AuthService } from 'src/app/services/auth.service'
import { FirebaseService } from 'src/app/services/firebase.service'

@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrls: ['./cadastrar-consulta.component.css'],
})
export class CadastrarConsultaComponent implements OnInit {
  animalForm!: FormGroup
  consultaForm!: FormGroup

  idAnimal!: number | null
  nm_animal!: string | null

  usuario!:Funcionario
  isActive = false;


  veterinario!: Veterinario[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private auth: Auth,
    private fireAuth:AuthService,
    private firebaseService: FirebaseService,
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

    this.consultaForm = this.formBuilder.group({
      id_animal: [this.idAnimal, Validators.required],
      id_vet: ['', Validators.required],
      motivo: ['', Validators.required],
      nome_animal: [this.nm_animal, Validators.required],
    })
  }

  registerConsulta(values: any) {
    let newConsulta:Consulta = {...values};
    this.animalService.registerConsulta(this.consultaForm.value).subscribe((response) => {

      this.animalService.registerConsultaFirebase(newConsulta);
      this.router.navigate(['atendente/listar-consulta'])
    })
  }

  get motivo() { return this.consultaForm.get('motivo')!; }
}
