import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Atendente } from '../models/atendente.model';

@Injectable({
  providedIn: 'root'
})
export class AtendenteauthService {

  constructor(private auth: Auth) { }

  async login (atendente: Atendente) {
    try{
      const user = await signInWithEmailAndPassword(
    this.auth,
    atendente.email,
    atendente.senha
     );
     return user;
  } catch (e) {
    return null;
  }
}

  async senhaperdida(email:string){
    const mail = sendPasswordResetEmail(this.auth,email);
    return mail;

  }

  logout() {
    return signOut(this.auth);
  }

}
