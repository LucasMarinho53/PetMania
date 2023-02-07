import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Dono } from 'src/app/models/dono.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'nome', 'telefone', 'email'];
  dataSource!:MatTableDataSource<Dono>;
  clickedRows!:Dono;
  usuario!:Funcionario
  isActive = false;
  searchForm!: FormGroup
  donos!: Dono[]

  constructor( private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router,
    private formBuilder: FormBuilder,
    private fireAuth:AuthService,
    private clientService: ClienteService
    ){  }

    ngOnInit(): void {

      console.log(this.auth.currentUser?.email);

      this.searchForm = this.formBuilder.group({
        searchValue: new FormControl('', [Validators.required]),
      })
      this.getClient();


      this.dataSource = new MatTableDataSource(this.donos);





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

    getClient() {
      this.clientService.getClient(this.searchForm.value.searchValue).subscribe({
        next: (res) => {
          this.donos = res
        },
        error: (e) => {
          console.error(e)
        },
      })
    }

    redirectToClientRegister() {
      this.router.navigateByUrl('cadastrar-cliente')
    }

    redirectToClientEdit(id: number | undefined) {
      this.router.navigate(['editar-cliente', id])
    }

}
