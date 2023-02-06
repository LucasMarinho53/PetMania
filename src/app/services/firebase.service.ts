import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';
import { Firestore,doc, collection,setDoc, collectionData, docSnapshots } from '@angular/fire/firestore';

const FUNCIONARIOS = 'funcionarios';

@Injectable({
  providedIn: 'root'
})


export class FirebaseService {

  constructor(private fireStore: Firestore) {  }


  encontrarPorId(id:string):Observable<Funcionario>{

    const document = doc(this.fireStore, `${FUNCIONARIOS}/${id}`);

    return docSnapshots(document).pipe(
      map(doc =>{
        const id = doc.id;
        const data = doc.data();

        return { id, ...data } as Funcionario;
      })
    );
  }
}