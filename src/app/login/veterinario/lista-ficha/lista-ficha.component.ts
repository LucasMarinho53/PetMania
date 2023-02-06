import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Atendente } from 'src/app/models/atendente.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-lista-ficha',
  templateUrl: './lista-ficha.component.html',
  styleUrls: ['./lista-ficha.component.css']
})
export class ListaFichaComponent implements OnInit{
  usuario!:Atendente
  isActive = false;

  constructor( private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router,
    private fireAuth:AuthService
    ){}

    ngOnInit(): void {

      console.log(this.auth.currentUser?.email);




      if(this.auth.currentUser!.email)
      {
        this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
          next:(res)=>{
            this.usuario = res
            if (res.cargo !== 2){
              this.fireAuth.logout().then(()=>{
                this.router.navigateByUrl('auth')
                window.location.reload();
              }

              )
            }
          },

          error:(err)=>console.log(err)

        })

      }

    }


}
