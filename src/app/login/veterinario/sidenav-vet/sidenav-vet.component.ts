import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-vet',
  templateUrl: './sidenav-vet.component.html',
  styleUrls: ['./sidenav-vet.component.css']
})
export class SidenavVetComponent {
  isActive = false;

  constructor(private router: Router,

    ){

  }

  routerListaFicha(){
    this.router.navigateByUrl('lista-ficha')
  }

}
