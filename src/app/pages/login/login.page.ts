import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  private loading: any;

  constructor(private fb: FormBuilder,
    private loadingController: LoadingController,
		private authService: AuthService,
		private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],

		});
	}

  async login() {
		const loading = await this.loadingController.create();
		await this.presentLoading();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl('prontuario', { replaceUrl: true });
		}
	}

  async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

  async presentLoading() {
    this.loading = await this.loadingController.create({ message: 'Aguarde...', duration: 500 });
    return this.loading.present();


  }
  async PageHome(){
    this.router.navigateByUrl('home', { replaceUrl: true });
   }
}
