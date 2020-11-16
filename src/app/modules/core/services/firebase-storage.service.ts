import {
  AngularFireStorage,
  AngularFireUploadTask,
  AngularFireStorageReference,
} from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadFileTask(filename: string, dataFile: any): AngularFireUploadTask {
    return this.storage.upload(filename, dataFile);
  }

  fileReference(filename: string): AngularFireStorageReference {
    return this.storage.ref(filename);
  }

  uploadBlob(ref: AngularFireStorageReference, blob: File): AngularFireUploadTask {
    return ref.put(blob);
  }
}
