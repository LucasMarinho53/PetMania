import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal.model'
import { Funcionario } from 'src/app/models/funcionario.model';
import { AnimalService } from 'src/app/services/animal.service'
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-lista-animal',
  templateUrl: './lista-animal.component.html',
  styleUrls: ['./lista-animal.component.css']
})
export class ListaAnimalComponent implements OnInit {
  idOrder:boolean = true;
  nomeOrder:boolean = true;
  sexoOrder:boolean = true;
  nascimentoOrder:boolean = true;
  racaOrder:boolean = true;
  especieOrder:boolean = true;
  donoOrder:boolean = true;


  usuario!:Funcionario
  isActive = false;
  searchForm!: FormGroup
  animais!: Animal[]

  constructor( private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router,
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private fireAuth:AuthService
    ){}

    ngOnInit(): void {

      this.searchForm = this.formBuilder.group({
        searchValue: new FormControl('', [Validators.required]),
      })
      this.getAnimal()


      // console.log(this.auth.currentUser?.email);




      if(this.auth.currentUser!.email)
      {
        this.firebaseService.encontrarPorId(this.auth.currentUser!.email).subscribe({
          next:(res)=>{
            this.usuario = res
            if (res.cargo != 1){
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

    getAnimal() {
      this.animalService.getAnimal(this.searchForm.value.searchValue).subscribe({
        next: (res) => {
          this.animais = res;
        },
      })
    }

    redirectToAnimalEdit(id: number | undefined, id_especie: number | undefined) {
      this.router.navigate(['atendente/editar-animal', id, id_especie])
    }

    redirectToClientList() {
      this.router.navigate(['atendente/lista-cliente'])
    }

    redirectToAnimalList() {
      this.router.navigate(['atendente/lista-animal'])
    }

    redirectToConsultaRegister(idAnimal: number | undefined, nome_animal: string) {
      this.router.navigate(['atendente/cadastrar-consulta', idAnimal, nome_animal])
    }



    ordenar(tipoOrdem:number){
      if(tipoOrdem == 1 && this.idOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          return a.id_animal -b.id_animal
        });
        this.idOrder = false;
        console.log(this.idOrder)
      }else if(tipoOrdem == 1 && !this.idOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          return b.id_animal -a.id_animal
        });
        this.idOrder = true;
        console.log(this.idOrder)
      }else if(tipoOrdem == 2 && this.nomeOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_animal>b.nome_animal){
            return 1;
          }else if(b.nome_animal>a.nome_animal){
            return -1;
          }else{
            return 0;
          }
        });
        this.nomeOrder = false;
      }else if(tipoOrdem == 2 && !this.nomeOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_animal<b.nome_animal){
            return 1;
          }else if(b.nome_animal<a.nome_animal){
            return -1;
          }else{
            return 0;
          }
        });
        this.nomeOrder = true;
      }
      else if(tipoOrdem == 3 && this.sexoOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.sexo_animal<b.sexo_animal){
            return 1;
          }else if(b.sexo_animal<a.sexo_animal){
            return -1;
          }else{
            return 0;
          }
        });
        this.sexoOrder = false;
      }else if(tipoOrdem == 3 && !this.sexoOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.sexo_animal>b.sexo_animal){
            return 1;
          }else if(b.sexo_animal>a.sexo_animal){
            return -1;
          }else{
            return 0;
          }
        });
        this.sexoOrder = true;
      }else if(tipoOrdem == 4 && this.nascimentoOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          return new Date(a.data_nasc).valueOf() - new Date(b.data_nasc).valueOf()
        });
        this.nascimentoOrder = false;
      }
      else if(tipoOrdem == 4 && !this.nascimentoOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          return new Date(b.data_nasc).valueOf() - new Date(a.data_nasc).valueOf()
        });
        this.nascimentoOrder = true;
      }else if(tipoOrdem == 5 && this.racaOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_raca<b.nome_raca){
            return 1;
          }else if(b.nome_raca<a.nome_raca){
            return -1;
          }else{
            return 0;
          }
        });
        this.racaOrder = false;
      }
      else if(tipoOrdem == 5 && !this.racaOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_raca>b.nome_raca){
            return 1;
          }else if(b.nome_raca>a.nome_raca){
            return -1;
          }else{
            return 0;
          }
        });
        this.racaOrder = true;
      }else if(tipoOrdem == 6 && this.especieOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_especie<b.nome_especie){
            return 1;
          }else if(b.nome_especie<a.nome_especie){
            return -1;
          }else{
            return 0;
          }
        });
        this.especieOrder = false;
      }else if(tipoOrdem == 6 && !this.especieOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_especie>b.nome_especie){
            return 1;
          }else if(b.nome_especie>a.nome_especie){
            return -1;
          }else{
            return 0;
          }
        });
        this.especieOrder = true;
      }
      else if(tipoOrdem == 7 && !this.donoOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_dono>b.nome_dono){
            return 1;
          }else if(b.nome_dono>a.nome_dono){
            return -1;
          }else{
            return 0;
          }
        });
        this.donoOrder = true;
      }else if(tipoOrdem == 7 && this.donoOrder){
        this.animais.sort((a:Animal,b:Animal)=>{
          if(a.nome_dono<b.nome_dono){
            return 1;
          }else if(b.nome_dono<a.nome_dono){
            return -1;
          }else{
            return 0;
          }
        });
        this.donoOrder = false;
      }
      //Fim do Metodo
    }
}


