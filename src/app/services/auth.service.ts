import { Injectable } from '@angular/core'
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
} from '@angular/fire/auth'

import { Dono } from '../models/dono.model'
import { Funcionario } from '../models/funcionario.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(funcionario: Funcionario) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        funcionario.email,
        funcionario.senha
      )
      return user
    } catch (e) {
      return null
    }
  }

  async senhaperdida(email: string) {
    const mail = sendPasswordResetEmail(this.auth, email)
    return mail
  }

  logout() {
    return signOut(this.auth)
  }
}
