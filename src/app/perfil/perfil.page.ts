import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { Dono } from '../models/dono.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profile: any = null;
  dono!: Dono;
  fichaDono!: Dono;
  donos!: Dono[]

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private avatarService: AvatarService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit() {
    let email = this.authService.userId();
    if (email) {
      this.firebaseService.getDonoById(email).subscribe({
        next: (fichaLogada) => {
          this.fichaDono = fichaLogada;
          // console.log(this.fichaDono);
        },
      });
    }
    this.firebaseService.getDono().subscribe({
      next: (e) => {
        // console.log(e);
        this.donos = e.filter(
          (ficha) => ficha.email === this.fichaDono.email
        );
        // console.log(this.donos)
      },
    });
  }

  getDonoById() {}

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload falhou',
          message: 'Tem um problema com o Upload.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
