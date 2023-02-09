import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isActive = false;

  constructor(private router: Router,
    private atendenteauthService: AuthService
    ){

  }

  async logout() {
    await this.atendenteauthService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  routerLista(){
    this.router.navigateByUrl('atendente/lista-cliente')
  }

  routerListaAnimal(){
    this.router.navigateByUrl('atendente/lista-animal')
  }

  routerListaConsulta(){
    this.router.navigateByUrl('atendente/listar-consulta')
  }

}
