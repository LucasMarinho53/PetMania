import { Component, OnInit } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Animal } from 'src/app/models/animal.model'
import { Dono } from 'src/app/models/dono.model'
import { Funcionario } from 'src/app/models/funcionario.model'
import { Raca } from 'src/app/models/raca.model'
import { AnimalService } from 'src/app/services/animal.service'
import { AuthService } from 'src/app/services/auth.service'
import { FirebaseService } from 'src/app/services/firebase.service'

@Component({
  selector: 'app-cadastrar-animal',
  templateUrl: './cadastrar-animal.component.html',
  styleUrls: ['./cadastrar-animal.component.css'],
})
export class CadastrarAnimalComponent implements OnInit {
  // animalForm!: FormGroup
  // animal!: Animal
  // racas!: Raca[]
  // animal = {};

  animalForm!: FormGroup
  animal: Animal = new Animal()
  id!: number
  id_especie!: number
  dono!: Dono[]
  racas!: Raca[]
  isActive = false;
  usuario!:Funcionario

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth,
    private fireAuth:AuthService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')
        const id_especie = this.route.snapshot.paramMap.get('id_especie')
        if (id) {
        this.id = +id
        // console.log(` id_dono: ${this.id}`)
        }
        if (id_especie) {
        this.id_especie = +id_especie
        // console.log(` id_especie: ${this.id_especie}`)
        }
        this.animalService.getRaceList(this.id_especie).subscribe({
          next: (res) => {
            // console.log(res);
            this.racas = res
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



    this.animalForm = this.formBuilder.group({
      nome_animal: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ùÂ-û ]+$/), Validators.minLength(4), Validators.maxLength(50)]],
      sexo_animal: ['', Validators.required],
      data_nasc: ['', Validators.required],
      id_dono: [ this.id , Validators.required],
      id_raca: ['', Validators.required],
    })
  }


  registerAnimal() {
    this.animalService.registerAnimal(this.animalForm.value).subscribe((response) => {
      // console.log(response)
      this.router.navigate(['atendente/lista-animal']);
    })
  }

  get nome() { return this.animalForm.get('nome_animal')!; }
  get sexo_animal() { return this.animalForm.get('sexo_animal')!; }
  get data_nasc() { return this.animalForm.get('data_nasc')!; }
  get id_dono() { return this.animalForm.get('id_dono')!; }
  get id_raca() { return this.animalForm.get('id_raca')!; }
}
