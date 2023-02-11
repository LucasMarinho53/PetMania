import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
  User
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private auth: AngularFireAuth,private firestore: AngularFirestore) { }

  async login({ email, password }:any) {
		return this.auth.signInWithEmailAndPassword(email, password)
		}



}
