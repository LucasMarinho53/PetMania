import {
  Firestore,
  collection,
  collectionData,
  doc,
  docSnapshots,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

import { Dono } from '../models/dono.model';
import { Ficha } from '../models/Ficha.model';
import { Injectable } from '@angular/core';

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

  getDono(): Observable<Dono[]> {
    const c_collection = collection(this.firestore, 'donos');
    return collectionData(c_collection, { idField: 'email' }).pipe(
      map((res) => res as Dono[])
    );
  }

  getDonoById(email: string): Observable<Dono> {
    const document = doc(this.firestore, `donos/${email}`);

    return docSnapshots(document).pipe(
      map((doc) => {
        const email = doc.id;
        const data = doc.data();

        return { email, ...data } as Dono;
      })
    );
  }
}
