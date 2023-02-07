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
import { Raca } from '../models/raca.model'

const API_URLS = {
  buscarAnimal:
    'http://localhost/PetMania/src/assets/php/atendente/animal/animal.listar.php',
  listarRacas:
    'http://localhost/PetMania/src/assets/php/atendente/animal/animal.listar-racas.php',
  cadastrarAnimal:
    'http://localhost/PetMania/src/assets/php/atendente/animal/animal.cadastro.php',
  acharAnimalPorId:
    'http://localhost/PetMania/src/assets/php/atendente/animal/animal.acharid.php',
  atualizarAnimal:
    'http://localhost/PetMania/src/assets/php/atendente/animal/animal.atualizar.php',
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

  registerAnimalFirebase(animal: Animal): Promise<void> {
    const document = doc(collection(this.firestore, 'animais'))
    return setDoc(document, animal)
  }
}
