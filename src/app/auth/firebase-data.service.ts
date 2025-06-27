import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, setDoc, query, orderBy, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor(private firestore: Firestore) {}

  // Agregar un nuevo registro a una colección
  agregarDato(data: any, coleccion: string) {
    const ref = collection(this.firestore, coleccion);
    return addDoc(ref, data);
  }

  // Obtener todos los registros de una colección
  obtenerDatos(coleccion: string): Observable<any[]> {
    const ref = collection(this.firestore, coleccion);
    const q = query(ref, orderBy('creadoEn', 'desc')); // 👈 ordenar por fecha descendente
    return collectionData(q, { idField: 'id' });
  }

  // (Opcional) Guardar con ID personalizado
  guardarConID(id: string, data: any, coleccion: string) {
    const docRef = doc(this.firestore, `${coleccion}/${id}`);
    return setDoc(docRef, data);
  }
  

  eliminarPrestamo(id: string) {
    const prestamoDoc = doc(this.firestore, 'prestamos', id);
    return deleteDoc(prestamoDoc);
  }

}
