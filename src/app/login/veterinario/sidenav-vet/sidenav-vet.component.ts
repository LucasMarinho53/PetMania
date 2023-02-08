import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav-vet',
  templateUrl: './sidenav-vet.component.html',
  styleUrls: ['./sidenav-vet.component.css']
})
export class SidenavVetComponent {
  isActive = false;

  constructor(private router: Router,
    private authService: AuthService
    ){

  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  routerListaFicha(){
    this.router.navigateByUrl('lista-ficha')
  }

}
