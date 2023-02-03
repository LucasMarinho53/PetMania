import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent {
  isActive = false;

  constructor(private router: Router){

  }

  routerAtendente(){
    this.router.navigateByUrl('atendente/lista-cliente')
  }

  routerVeterinario(){
    this.router.navigateByUrl('lista-ficha')
  }

}
