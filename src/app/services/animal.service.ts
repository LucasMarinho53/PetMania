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
import { Veterinario } from '../models/veterinario.model'

const API_URLS = {
  buscarAnimal:
    'http://localhost/PetMania-master/src/assets/php/atendente/animal/animal.listar.php',
  listarRacas:
    'http://localhost/PetMania-master/src/assets/php/atendente/animal/animal.listar-racas.php',
  cadastrarAnimal:
    'http://localhost/PetMania-master/src/assets/php/atendente/animal/animal.cadastro.php',
  acharAnimalPorId:
    'http://localhost/PetMania-master/src/assets/php/atendente/animal/animal.acharid.php',
  atualizarAnimal:
    'http://localhost/PetMania-master/src/assets/php/atendente/animal/animal.atualizar.php',
  buscarVeterinario:
    'http://localhost/PetMania-master/src/assets/php/atendente/consulta/consulta.veterinario.listar.php',
    cadastrarConsulta:
    'http://localhost/PetMania-master/src/assets/php/atendente/consulta/consulta.cadastrar.php',
    listarConsulta:
    'http://localhost/PetMania-master/src/assets/php/atendente/consulta/consulta.listar.php',
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

  getAnimal(busca: any = ''): Observable<Animal[]> {
    return this.http.get<Animal[]>(
      `${API_URLS.buscarAnimal}?buscar=${busca}`,
      HTTP_OPTIONS
    )
  }

  getConsulta(busca: any = ''): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(
      `${API_URLS.listarConsulta}?buscar=${busca}`,
      HTTP_OPTIONS
    )
  }

  getVeterinario(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(
      `${API_URLS.buscarVeterinario}`,
      HTTP_OPTIONS
    )
  }

  getAnimalById(id: number): Observable<any> {
    return this.http.get(`${API_URLS.acharAnimalPorId}?buscar=${id}`)
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

  registerAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(API_URLS.cadastrarAnimal, animal, HTTP_OPTIONS)
  }

  registerConsulta(cad: CadastrarConsultaModel): Observable<CadastrarConsultaModel> {
    // console.log(cad)
    return this.http.post<CadastrarConsultaModel>(API_URLS.cadastrarConsulta, cad, HTTP_OPTIONS)
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
