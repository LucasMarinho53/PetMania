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
      this.inicializaForm();
      this.validaUsuario();
    }

  private validaUsuario() {
    if (this.auth.currentUser!.email) {
      this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
        next: (res) => {
          this.usuario = res;
          if (res.cargo !== 1) {
            this.fireAuth.logout().then(() => {
              this.router.navigateByUrl('auth');
              window.location.reload();
            }

            );
          }
        },

        error: (err) => console.log(err)
      });

    }
  }

  private inicializaForm() {
    this.clientForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ùÂ-û ]+$/), Validators.minLength(4), Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.pattern(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/)]],
      endereco: this.formBuilder.group({
        cidade: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        bairro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        logradouro: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
        numero: ['', [Validators.required, , Validators.pattern('[0-9]+')]],
      }),
    });
  }

    registerClient() {
      const dono = this.clientForm.value as Dono
      const cpf:string = this.cpf.value;
      const cep:string = this.cep.value;

      dono.cpf = +cpf.replace(/[.-]/g, '');
      dono.endereco.cep = +cep.replace(/[.-]/g, '');

      this.clientService.registerClient(dono).subscribe({
        next: (result) => {
          // console.log(result);
          if(result.result == 'success'){
            this.clientService.registerClientFirebase(dono);
            this.router.navigate(['atendente/lista-cliente'])
          }
        },
        error: (e) => {
          console.error(e)
        },
      })
    }

    get nome() { return this.clientForm.get('nome')!; }
    get cpf() { return this.clientForm.get('cpf')!; }
    get email() { return this.clientForm.get('email')!; }
    get telefone() { return this.clientForm.get('telefone')!; }
    get cidade() { return this.clientForm.get('endereco')?.get('cidade')!; }
    get bairro() { return this.clientForm.get('endereco')?.get('bairro')!; }
    get logradouro() { return this.clientForm.get('endereco')?.get('logradouro')!; }
    get cep() { return this.clientForm.get('endereco')?.get('cep')!; }
    get numero() { return this.clientForm.get('endereco')?.get('numero')!; }

}
