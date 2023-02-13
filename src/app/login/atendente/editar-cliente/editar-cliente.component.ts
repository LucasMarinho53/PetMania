import { Component, OnInit } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Dono } from 'src/app/models/dono.model'
import { Funcionario } from 'src/app/models/funcionario.model'
import { AuthService } from 'src/app/services/auth.service'
import { ClienteService } from 'src/app/services/cliente.service'
import { FirebaseService } from 'src/app/services/firebase.service'

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  clientForm!: FormGroup
  isActive = false;
  id!: number
  dono!: Dono
  usuario!:Funcionario

  constructor(
    private clientService: ClienteService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth,
    private fireAuth:AuthService,
    private firebaseService: FirebaseService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.id = +id

      this.clientService.getClientById(+id).subscribe({
        next: (res) => {
          this.clientForm = this.formBuilder.group({
            id_dono: [res.id_dono, Validators.required],
            nome: [res.nome, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ùÂ-û ]+$/), Validators.minLength(4), Validators.maxLength(50)]],
            cpf: [res.cpf, [Validators.required, Validators.pattern(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/)]],
            email: [res.email, [Validators.required, Validators.email]],
            telefone: [res.telefone, [Validators.required, Validators.pattern(/^^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/)]],
            endereco: this.formBuilder.group({
              id_end: [res.id_end, Validators.required],
              cidade: [res.cidade, [Validators.required]],
              bairro: [res.bairro, [Validators.required]],
              logradouro: [res.logradouro, [Validators.required]],
              cep: [res.cep, [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
              numero: [res.numero, [Validators.required, , Validators.pattern('[0-9]+')]],
            }),
          })
        },
        error: (e) => {
          console.error(e)
        },
      })
    } else {
    }
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

  editCliente() {
    const dono = this.clientForm.value as Dono


    const cpf:string = ""+this.cpf.value;
    const cep:string = ""+this.cep.value;
    console.log(typeof cpf, cpf);
    console.log(cep);



    dono.cpf = +cpf.replace(/[.-]/g, '');
    dono.endereco.cep = +cep.replace(/[.-]/g, '');

    this.clientService.updateClient(dono).subscribe((res) => {
      console.log(res)
      if(res.result == 'success'){
        this.clientService.updateClientFirebase(dono);
        this.router.navigate(['atendente/lista-cliente'])
      }
    })
  }

  get nome() { return this.clientForm.get('nome')!; }
    get cpf() { return this.clientForm.get('cpf')!; }
    get email() { return this.clientForm.get('email')!; }
    get telefone() { return this.clientForm.get('telefone')!; }
    get cidade() { return this.clientForm.get('endereco')?.get('cidade')!; }
    get bairro() { return this.clientForm.get('endereco')?.get('bairro')!; }
    get logradouro() { return this.clientForm.get('endereco')?.get('logradouro')!; }
    get cep() { return this.clientForm.get('endereco')?.get('cep')!; }
    get numero() { return this.clientForm.get('endereco')?.get('numero')!; }
}
