import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Dono } from '../models/dono.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  type: boolean = true;
  dono!:Dono;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

    get email() {
      return this.loginForm.get('email');
    }
    get senha() {
      return this.loginForm.get('senha');
    }

    ngOnInit(): void{
      this.loginForm = this.formBuilder.group({
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

    async register() {
      const loading = await this.loadingController.create();
      await loading.present();

      const user = await this.authService.register(this.loginForm.value);
      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('perfil', { replaceUrl: true });
      } else {
        this.showAlert('Registro falhou.', 'Por favor tente novamente!');
      }
    }

    async login() {
      const loading = await this.loadingController.create();
      await loading.present();

      const user = await this.authService.login(this.loginForm.value);
      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('perfil', { replaceUrl: true });
      } else {
        this.showAlert('Login falhou.', 'Por favor tente novamente!');
      }
    }

    async showAlert(header: any, message: any) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK'],
      });
      await alert.present();
    }

    changeType(){
      this.type = !this.type;
    }

    esqueceuSenha(){
      this.router.navigateByUrl('home');
    }

}
