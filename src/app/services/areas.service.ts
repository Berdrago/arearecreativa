import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  constructor(public database:  AngularFirestore) { }
  //Creacion
  createDoc(data: any, path: string , id: string ){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }
  //Lectura
  getDoc(path: string, id: string ){
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }
  //Eliminacion
  deleteDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
  //Actualizacion
  updateDoc(data: any, path: string , id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }
  //Generador de Id
  getId(){
    return this.database.createId();
  }
  //Collecion para leer mas de Uno
  getCollection< tipo >(path: string ){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

}
