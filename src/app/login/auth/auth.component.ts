import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendente } from 'src/app/models/atendente.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  atendenteForm!: FormGroup;
  type: boolean = true;
  atendente!:Atendente;
  isActive = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,) { }

    get email() {
      return this.atendenteForm.get('email');
    }
    get senha() {
      return this.atendenteForm.get('senha');
    }

    ngOnInit(): void{
      this.atendenteForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required, Validators.pattern(/^(?=.*[@*\.])[a-zA-Z0-9@*]{6,10}$/)]],
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

      if (user) {
        console.log(user)
        this.router.navigateByUrl('atendente/lista-cliente', { replaceUrl: true });
      } else {
        alert('Login falhou.');
      }
    }



    changeType(){
      this.type = !this.type;
    }


}
