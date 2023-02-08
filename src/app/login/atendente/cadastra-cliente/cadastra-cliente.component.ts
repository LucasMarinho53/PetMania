import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dono } from 'src/app/models/dono.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cadastra-cliente',
  templateUrl: './cadastra-cliente.component.html',
  styleUrls: ['./cadastra-cliente.component.css']
})
export class CadastraClienteComponent implements OnInit {
  usuario!:Funcionario
  isActive = false;
  clientForm!: FormGroup

  constructor( private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router,
    private fireAuth:AuthService,
    private formBuilder: FormBuilder,
    private clientService: ClienteService,
    ){}

    ngOnInit(): void {

      this.clientForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ùÂ-û ]+$/), Validators.minLength(4), Validators.maxLength(50)]],
        cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        endereco: this.formBuilder.group({
          cidade: ['', [Validators.required]],
          bairro: ['', [Validators.required]],
          logradouro: ['', [Validators.required]],
          cep: ['', [Validators.required,  Validators.pattern('[0-9]{8}')]],
          numero: ['', [Validators.required, , Validators.pattern('[0-9]+')]],
        }),
      })

      console.log(this.auth.currentUser?.email);




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

    registerClient() {
      const dono = this.clientForm.value as Dono
      this.clientService.registerClient(dono).subscribe({
        next: () => {
          this.router.navigate(['atendente/lista-cliente'])
        },
        error: (e) => {
          console.error(e)
        },
      })
    }

}
