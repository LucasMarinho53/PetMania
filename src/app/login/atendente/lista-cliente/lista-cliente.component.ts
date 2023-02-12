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
  idOrder:boolean = true;
  nomeOrder:boolean = true;
  telefoneOrder:boolean = true;
  emailOrder:boolean = true;





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

    redirectToAnimalRegister(id: number | undefined, id_especie: number) {
      this.router.navigate(['atendente/cadastrar-animal', id, id_especie])
    }

    redirectToClientRegister() {
      this.router.navigateByUrl('cadastrar-cliente')
    }

    redirectToClientEdit(id: number | undefined) {
      this.router.navigate(['editar-cliente', id])
    }








    ordenar(tipo:number){
      if(tipo == 1 && this.idOrder){
        this.donos.sort((a:Dono,b:Dono)=>{
          return a.id_dono -b.id_dono
        });
        this.idOrder = false;
        console.log(this.idOrder)
      }else if(tipo == 1 && !this.idOrder){
        this.donos.sort((a:Dono,b:Dono)=>{
          return b.id_dono -a.id_dono
        });
        this.idOrder = true;
        console.log(this.idOrder)
      }else if(tipo == 2 && this.nomeOrder){
        this.donos.sort((a:Dono,b:Dono)=>{
          if(a.nome>b.nome){
            return 1;
          }else if(b.nome>a.nome){
            return -1;
          }else{
            return 0;
          }
        });
        this.nomeOrder = false;
        console.log(this.nomeOrder)
      }else if( tipo == 2 && !this.nomeOrder ){
        this.donos.sort((a:Dono,b:Dono)=>{
          if(a.nome<b.nome){
            return 1;
          }else if(b.nome<a.nome){
            return -1;
          }else{
            return 0;
          }
        });
        this.nomeOrder = true;
        console.log(this.nomeOrder)
      }else if( tipo == 3 && this.telefoneOrder ){
        this.donos.sort((a:Dono,b:Dono)=>{
          if(a.telefone<b.telefone){
            return 1;
          }else if(b.telefone<a.telefone){
            return -1;
          }else{
            return 0;
          }
        });
        this.telefoneOrder = false;
        console.log(this.telefoneOrder)
      }else if( tipo == 3 && !this.telefoneOrder ){
        this.donos.sort((a:Dono,b:Dono)=>{
          if(a.telefone>b.telefone){
            return 1;
          }else if(b.telefone>a.telefone){
            return -1;
          }else{
            return 0;
          }
        });
        this.telefoneOrder = true;
        console.log(this.telefoneOrder)
      }
      else if( tipo == 4 && this.emailOrder ){
        this.donos.sort((a:Dono,b:Dono)=>{
          if(a.email<b.email){
            return 1;
          }else if(b.email<a.email){
            return -1;
          }else{
            return 0;
          }
        });
        this.emailOrder = false;
        console.log(this.emailOrder)
      }else if( tipo == 4 && !this.emailOrder ){
        this.donos.sort((a:Dono,b:Dono)=>{
          if(a.email>b.email){
            return 1;
          }else if(b.email>a.email){
            return -1;
          }else{
            return 0;
          }
        });
        this.emailOrder = true;
        console.log(this.emailOrder)
      }

      //fim metodo
    }

}
