import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  atendenteForm!: FormGroup;
  type: boolean = true;
  usuario!:Funcionario;
  isActive = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private auth: Auth) { }

    get email() {
      return this.atendenteForm.get('email');
    }
    get senha() {
      return this.atendenteForm.get('senha');
    }

    ngOnInit(): void{
      this.atendenteForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required]],
      });
    }

    recuperarSenha(){
      this.authService.senhaperdida(this.email?.getRawValue()).then(()=>{
        alert('Enviamos um e-mail para recuperação de senha.')
      }).catch((err)=>{

        if(err == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
          alert('E-mail invalido.')
        }
      })
    }

    async login() {

      const user = await this.authService.login(this.atendenteForm.value);

      if (this.auth.currentUser!.email) {
        this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
          next:(res)=>{
            this.usuario = res
            if (res.cargo == 1){
              this.router.navigateByUrl('atendente/lista-cliente');
            } if (res.cargo == 2){
              this.router.navigateByUrl('lista-ficha');
            }

          },

          error:(err)=>console.log(err)

        })

      }
    }



    changeType(){
      this.type = !this.type;
    }


}
