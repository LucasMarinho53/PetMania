import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Dono } from 'src/app/models/dono.model'
import { ClienteService } from 'src/app/services/cliente.service'

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  id!: number
  dono!: Dono

  constructor(private clientService: ClienteService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.id = +id
      // console.log(id)

      this.clientService.getDonoById(+id).subscribe({
        next: (res) => {
          // console.log(res);
        },
        error: (e) => {
          console.error(e);
        },
      })
    } else {
    }
  }
}
