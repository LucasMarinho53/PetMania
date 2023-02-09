import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Dono } from '../models/dono.model'

const API_URLS = {
  buscarCliente:
    'http://localhost/PetMania-master/src/assets/php/atendente/cliente/cliente.listar.php',
  cadastrarCliente:
    'http://localhost/PetMania-master/src/assets/php/atendente/cliente/cliente.cadastro.php',
  acharClientePorId:
    'http://localhost/PetMania-master/src/assets/php/atendente/cliente/cliente.acharid.php',
  atualizarCliente:
    'http://localhost/PetMania-master/src/assets/php/atendente/cliente/cliente.atualizar.php',
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
    // Coleta a coleção "donos" do Firestore
    const c_collection = collection(this.firestore, 'donos')

    // Retorna os dados da coleção, mapeando-os como objetos do tipo Dono
    return collectionData(c_collection, { idField: 'email' }).pipe(
      map((res) => res as Dono[])
    )
  }

  registerClient(dono: Dono): Observable<Dono> {
    // Aqui está desestruturando o objeto "dono" em suas propriedades individuais
    const { cpf, nome, email, telefone, endereco } = dono

    // Aqui está convertendo as propriedades em um objeto JSON
    const body = JSON.stringify({ cpf, nome, email, telefone, ...endereco })

    this.registerClientFirebase(dono)
    return this.http.post<Dono>(API_URLS.cadastrarCliente, body, HTTP_OPTIONS)
  }

  registerClientFirebase(dono: Dono): Promise<void> {
    const document = doc(collection(this.firestore, 'donos'), dono?.email)
    return setDoc(document, dono)
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${API_URLS.acharClientePorId}?buscar=${id}`)
  }

  updateClient(dono: Dono): Observable<Dono> {
    // Desestruturação de objeto para pegar as propriedades relevantes
    const { id_dono, nome, cpf, email, telefone, endereco } = dono

    // Criação do corpo da requisição HTTP com os dados do cliente
    const body = JSON.stringify({ id_dono, nome, cpf, email, telefone, ...endereco })

    this.updateClientFirebase(dono)
    return this.http.post<Dono>(API_URLS.atualizarCliente, body, HTTP_OPTIONS)
  }

  updateClientFirebase(dono: Dono): Promise<void> {
    const document = doc(this.firestore, 'donos', dono?.cpf.toString())

    // Desestruturação dos dados do dono, separando os dados principais dos dados do endereço
    const { cpf, id_dono, endereco, ...data } = dono
    const { id_end, ...enderecoData } = endereco

    // Atualiza o documento do dono no firestore, com os dados principais e os dados do endereço
    return setDoc(document, { ...data, endereco: enderecoData })
  }
}
