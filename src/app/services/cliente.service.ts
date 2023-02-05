import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Dono } from '../models/dono.model'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  }),
}
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl =
    'http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.listar.php?buscar='
  private apiUrl2 =
    'http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.cadastro.php'
  private apiUrl3 = `http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.acharid.php`
  private apiUrl4 = `http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.atualizar.php`

  constructor(private http: HttpClient) {}

  getClient(x: any = ''): Observable<Dono[]> {
    return this.http.get<Dono[]>(`${this.apiUrl}${x}`)
  }

  cadastrarDono(dono: Dono): Observable<Dono> {
    const body = JSON.stringify({
      cpf: dono.cpf,
      nome: dono.nome,
      email: dono.email,
      telefone: dono.telefone,
      cidade: dono.endereco.cidade,
      bairro: dono.endereco.bairro,
      logradouro: dono.endereco.logradouro,
      numero: dono.endereco.numero,
      cep: dono.endereco.cep,
    })

    return this.http.post<Dono>(this.apiUrl2, body, httpOptions)
  }

  getDonoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl3}?buscar=${id}`)
  }

  editDono(dono: Dono): Observable<Dono> {
    const body = JSON.stringify({
      nome: dono.nome,
      cpf: dono.cpf,
      email: dono.email,
      telefone: dono.telefone,
      cidade: dono.endereco.cidade,
      bairro: dono.endereco.bairro,
      logradouro: dono.endereco.logradouro,
      cep: dono.endereco.cep,
      numero: dono.endereco.numero,
      id_dono: dono.id_dono,
      id_end: dono.endereco.id_end
    });

    return this.http.post<Dono>(this.apiUrl4, body, httpOptions);
  }

}
