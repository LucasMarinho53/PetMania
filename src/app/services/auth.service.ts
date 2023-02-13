import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
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

const CONSULTA = 'consulta';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(dono: Dono) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        dono.email,
        dono.senha
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(dono: Dono) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        dono.email,
        dono.senha
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async senhaperdida(email: string) {
    const mail = sendPasswordResetEmail(this.auth, email);
    return mail;
  }

  logout() {
    return signOut(this.auth);
  }

  encontrarPorId(id_ficha: string): Observable<Ficha> {
    const document = doc(this.firestore, `${CONSULTA}/${id_ficha}`);

    return docSnapshots(document).pipe(
      map((doc) => {
        const id_ficha = doc.id;
        const data = doc.data();

        return { id_ficha, ...data } as Ficha;
      })
    );
  }

  userId() {
    if (this.auth.currentUser) {
      return this.auth.currentUser!.email;
    } else {
      return;
    }
  }
}
