import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore'
import { setDoc } from 'firebase/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Dono } from '../models/dono.model'

const API_URLS = {
  buscarCliente:
    'http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.listar.php',
  cadastrarCliente:
    'http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.cadastro.php',
  acharClientePorId:
    'http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.acharid.php',
  atualizarCliente:
    'http://localhost/PetMania/src/assets/php/atendente/cliente/cliente.atualizar.php',
}

const HTTP_OPTIONS = {
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
  constructor(private http: HttpClient, private firestore: Firestore) {}

  getClient(busca: any = ''): Observable<Dono[]> {
    return this.http.get<Dono[]>(
      `${API_URLS.buscarCliente}?buscar=${busca}`,
      HTTP_OPTIONS
    )
  }

  registerClient(dono: Dono): Observable<Dono> {
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
    this.registerClientFirebase(dono)

    return this.http.post<Dono>(API_URLS.cadastrarCliente, body, HTTP_OPTIONS)
  }

  getClientFirebase(): Observable<Dono[]> {
    const c_collection = collection(this.firestore, 'donos')
    return collectionData(c_collection, { idField: 'cpf' }).pipe(
      map((res) => res as Dono[])
    )
  }

  registerClientFirebase(dono: Dono): Promise<void> {
    return new Promise((resolve) => {
      this.getClientFirebase().subscribe({
        next: (res) => {
          const cpfExists = res.find((e) => e.cpf === dono.cpf)
          if (!cpfExists) {
            const document = doc(
              collection(this.firestore, 'donos'),
              dono?.cpf.toString()
            )
            setDoc(document, dono)
              .then(() => resolve())
          }
        },
        error: (error) => console.error(error),
      })
    })
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${API_URLS.acharClientePorId}?buscar=${id}`)
  }

  updateClient(dono: Dono): Observable<Dono> {
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
      id_end: dono.endereco.id_end,
    })
    this.updateClientFirebase(dono)

    return this.http.post<Dono>(API_URLS.atualizarCliente, body, HTTP_OPTIONS)
  }

  updateClientFirebase(dono: Dono): Promise<void> {
    const document = doc(this.firestore, 'donos', dono?.cpf.toString())
    const { cpf, ...data } = dono
    return setDoc(document, data)
  }
}
