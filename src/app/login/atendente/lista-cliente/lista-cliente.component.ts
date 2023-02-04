import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Atendente } from 'src/app/models/atendente.model';
import { AtendenteauthService } from 'src/app/services/atendenteauth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  usuario!:Atendente
  isActive = false;

  constructor( private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router,
    private fireAuth:AtendenteauthService
    ){}

    ngOnInit(): void {

      console.log(this.auth.currentUser?.email);




      if(this.auth.currentUser!.email)
      {
        this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
          next:(res)=>{
            this.usuario = res
            if (res.cargo !== 1){
              this.fireAuth.logout().then(()=>{
                this.router.navigateByUrl('atendente/auth')
              }

              )
            }
          },

          error:(err)=>console.log(err)

        })

      }

    }

}
