import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Atendente } from '../models/atendente.model';
import { Firestore,doc, collection,setDoc, collectionData, docSnapshots } from '@angular/fire/firestore';

const FUNCIONARIO = 'funcionario';

@Injectable({
  providedIn: 'root'
})


export class FirebaseService {

  constructor(private fireStore: Firestore) {  }


  encontrarPorId(id:string):Observable<Atendente>{

    const document = doc(this.fireStore, `${FUNCIONARIO}/${id}`);

    return docSnapshots(document).pipe(
      map(doc =>{
        const id = doc.id;
        const data = doc.data();

        return { id, ...data } as Atendente;
      })
    );
  }
}
