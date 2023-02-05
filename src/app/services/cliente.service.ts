import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Dono } from '../models/dono.model'
import { Endereco } from '../models/endereco.model'

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
    });

    return this.http.post<Dono>(this.apiUrl2, body, httpOptions);
  }
}

// Isaque esteve aqui
