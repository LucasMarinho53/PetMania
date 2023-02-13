import { Injectable } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage'
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Photo } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor( private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    ) { }

    getUserProfile() {
      const user = this.auth.currentUser;
      const userDocRef = doc(this.firestore, `fotos/${user?.email}`);
      return docData(userDocRef);
    }

    async uploadImage(cameraFile: Photo) {
      const user = this.auth.currentUser;
      const path = `uploads/${user?.email}/profile.png`;
      const storageRef = ref(this.storage, path);

      try {
        await uploadString(storageRef, cameraFile.base64String!, 'base64');
        const imageUrl = await getDownloadURL(storageRef);
        const userDocRef = doc(this.firestore, `fotos/${user?.email}`);
        await setDoc(userDocRef, {
          imageUrl,
        });
        return true;
      } catch (e) {
        return null;
      }
    }
}
