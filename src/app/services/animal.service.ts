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

import { Animal } from '../models/animal.model'
import { CadastrarConsultaModel } from '../models/cadastrarConsultaModel.model'
import { Consulta } from '../models/consulta.model'
import { Raca } from '../models/raca.model'
import { Servico } from '../models/servico.model'
import { ServicoCadastrar } from '../models/servicoCadastrar.model'
import { ServicoListarConsulta } from '../models/servicoListarConsulta.model'
import { Veterinario } from '../models/veterinario.model'

const API_URLS = {
  buscarAnimal:
    'http://localhost/webservice/atendente/animal/animal.listar.php',
  listarRacas:
    'http://localhost/webservice/atendente/animal/animal.listar-racas.php',
  cadastrarAnimal:
    'http://localhost/webservice/atendente/animal/animal.cadastro.php',
  acharAnimalPorId:
    'http://localhost/webservice/atendente/animal/animal.acharid.php',
  atualizarAnimal:
    'http://localhost/webservice/atendente/animal/animal.atualizar.php',
  buscarVeterinario:
    'http://localhost/webservice/atendente/consulta/consulta.veterinario.listar.php',
    cadastrarConsulta:
    'http://localhost/webservice/atendente/consulta/consulta.cadastrar.php',
    listarConsulta:
    'http://localhost/webservice/atendente/consulta/consulta.listar.php',
    listarServico:
    'http://localhost/webservice/atendente/consulta/servicos.listar.php',
    cadastrarServico:
    'http://localhost/webservice/atendente/consulta/servicos.cadastrar.php',
    servicoListarConsulta:
    'http://localhost/webservice/atendente/consulta/servicos.listar.consulta.php',
    removerServico:
    'http://localhost/webservice/atendente/consulta/servicos.remover.php',
    listarConsultasEmail:'http://localhost/webservice/atendente/consulta/consulta.listar.email.php'
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
export class AnimalService {
  constructor(private http: HttpClient, private firestore: Firestore) {}

  getConsulta(busca: any = ''): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(
      `${API_URLS.listarConsulta}?buscar=${busca}`,
      HTTP_OPTIONS
    )
  }

  getConsultasEmail(email:string):Observable<Consulta[]>{
    return this.http.get<Consulta[]>(
      `${API_URLS.listarConsultasEmail}?buscar=${email}`,
      HTTP_OPTIONS
    )
  }

  removerServico(serv: ServicoCadastrar): Observable<any> {

    return this.http.get<any>(
      `${API_URLS.removerServico}?idservico=${serv.id_servico}&idficha=${serv.id_ficha}`,
      HTTP_OPTIONS
    )
  }

  getServicoList(buscar: number): Observable<ServicoListarConsulta[]> {
    return this.http.get<ServicoListarConsulta[]>(
      `${API_URLS.servicoListarConsulta}?buscar=${buscar}`,
      HTTP_OPTIONS
    )
  }

  getServico(busca: any = ''): Observable<Servico[]> {
    return this.http.get<Servico[]>(
      `${API_URLS.listarServico}${busca}`,
      HTTP_OPTIONS
    )
  }

  getAnimal(busca: any = ''): Observable<Animal[]> {
    return this.http.get<Animal[]>(
      `${API_URLS.buscarAnimal}?buscar=${busca}`,
      HTTP_OPTIONS
    )
  }

  getVeterinario(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(
      `${API_URLS.buscarVeterinario}`,
      HTTP_OPTIONS
    )
  }

  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API_URLS.acharAnimalPorId}?buscar=${id}`)
  }

  getRaceList(busca: number): Observable<Raca[]> {
    return this.http.get<Raca[]>(
      `${API_URLS.listarRacas}?id_especie=${busca}`,
      HTTP_OPTIONS
    )
  }

  getAnimalFirebase(): Observable<Animal[]> {
    const c_collection = collection(this.firestore, 'animais')

    return collectionData(c_collection, { idField: 'id_animal' }).pipe(
      map((res) => res as Animal[])
    )
  }

  registerServico(serv: ServicoCadastrar): Observable<ServicoCadastrar> {
    return this.http.post<ServicoCadastrar>(API_URLS.cadastrarServico, serv, HTTP_OPTIONS)
  }

  registerAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(API_URLS.cadastrarAnimal, animal, HTTP_OPTIONS)
  }

  registerConsulta(cad: CadastrarConsultaModel): Observable<any> {
    // console.log(cad)
    return this.http.post<any>(API_URLS.cadastrarConsulta, cad, HTTP_OPTIONS)
  }

  registerConsultaFirebase(consulta: Consulta[],emailId:string): Promise<void>{
    console.log("firedata:",consulta)


    const document = doc(this.firestore, 'consulta',emailId);

    let listaConsultas = {
      "consultas":consulta,
    }
    console.log(listaConsultas)

    return setDoc(document, listaConsultas);
  }



  registerAnimalFirebase(animal: Animal): Promise<void> {
    const document = doc(collection(this.firestore, 'animais'))
    return setDoc(document, animal)
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    const { nome_animal, sexo_animal, data_nasc, id_raca, id_animal } = animal
    const body = JSON.stringify({
      nome_animal,
      sexo_animal,
      data_nasc,
      id_raca,
      id_animal,
    })
    // this.updateClientFirebase(dono)
    // console.log(body)
    return this.http.post<Animal>(API_URLS.atualizarAnimal, body, HTTP_OPTIONS)
  }
}
