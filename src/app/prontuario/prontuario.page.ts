import { Component, OnInit } from '@angular/core';

import { Consulta } from '../models/Consulta.model';
import { Ficha } from '../models/Ficha.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.page.html',
  styleUrls: ['./prontuario.page.scss'],
})
export class ProntuarioPage implements OnInit {
  consultas!: Consulta[];
  fichas!: Ficha[]

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getConsulta().subscribe({
      next: (res) => {
        // console.log(res[1].consultas[0].nome_dono)
        // console.log(res[1].consultas)
        this.fichas = res;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
