import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Dono } from '../models/dono.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register(dono: Dono) {
    try{
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


  async login (dono: Dono) {
      try{
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

  async senhaperdida(email:string){
    const mail = sendPasswordResetEmail(this.auth,email);
    return mail;

  }

  logout() {
    return signOut(this.auth);
  }
}
