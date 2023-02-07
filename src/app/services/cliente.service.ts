import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore'
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

  getClientFirebase(): Observable<Dono[]> {
    const c_collection = collection(this.firestore, 'donos')
    return collectionData(c_collection, { idField: 'cpf' }).pipe(
      map((res) => res as Dono[])
    )
  }

  registerClient(dono: Dono): Observable<Dono> {
    const { cpf, nome, email, telefone, endereco } = dono
    const body = JSON.stringify({ cpf, nome, email, telefone, ...endereco })
    this.registerClientFirebase(dono)
    return this.http.post<Dono>(API_URLS.cadastrarCliente, body, HTTP_OPTIONS)
  }

  registerClientFirebase(dono: Dono): Promise<void> {
    const document = doc(collection(this.firestore, 'donos'), dono?.cpf.toString())
    return setDoc(document, dono)
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${API_URLS.acharClientePorId}?buscar=${id}`)
  }

  updateClient(dono: Dono): Observable<Dono> {
    const { id_dono, nome, cpf, email, telefone, endereco } = dono
    const body = JSON.stringify({ id_dono, nome, cpf, email, telefone, ...endereco })
    this.updateClientFirebase(dono)
    return this.http.post<Dono>(API_URLS.atualizarCliente, body, HTTP_OPTIONS)
  }

  updateClientFirebase(dono: Dono): Promise<void> {
    const document = doc(this.firestore, 'donos', dono?.cpf.toString())
    const { cpf, id_dono, endereco, ...data } = dono
    const { id_end, ...enderecoData } = endereco
    return setDoc(document, { ...data, endereco: enderecoData })
  }
}
