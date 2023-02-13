import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { Consulta } from '../models/Consulta.model';
import { Ficha } from '../models/Ficha.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  getConsulta(): Observable<Ficha[]> {
    const c_collection = collection(this.firestore, 'consulta');
    return collectionData(c_collection, { idField: 'id_ficha' }).pipe(
      map((res) => res as Ficha[])
    );
  }
}
