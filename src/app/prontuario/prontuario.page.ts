import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Consulta } from '../models/Consulta.model';
import { Ficha } from '../models/Ficha.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.page.html',
  styleUrls: ['./prontuario.page.scss'],
})
export class ProntuarioPage implements OnInit {
  fichaUsuarioLogado!: Ficha;
  consultas!: Consulta[];
  fichas!: Ficha[];

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let email = this.authService.userId();
    if (email) {
      this.authService.encontrarPorId(email).subscribe((fichaUsuarioLogado) => {
        this.fichaUsuarioLogado = fichaUsuarioLogado;
        // console.log(this.fichaUsuarioLogado);
      });
    }

    this.firebaseService.getConsulta().subscribe({
      next: (todasFichas) => {
        this.fichas = todasFichas.filter(
          (ficha) => ficha.id_ficha === this.fichaUsuarioLogado.id_ficha
        );
        // console.log(this.fichas);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
