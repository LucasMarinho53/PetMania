import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-lista-consulta',
  templateUrl: './lista-consulta.component.html',
  styleUrls: ['./lista-consulta.component.css']
})
export class ListaConsultaComponent implements OnInit {
  usuario!:Funcionario
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
            if (res.cargo !== 1){
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
