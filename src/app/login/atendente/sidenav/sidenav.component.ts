import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isActive = false;

  constructor(private router: Router){

  }

  routerLista(){
    this.router.navigateByUrl('atendente/lista-cliente')
  }

}
