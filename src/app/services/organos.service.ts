// services/organos.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, where, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Organo } from '../../models/organo.model';

@Injectable({
  providedIn: 'root',
})
export class OrganosService {
  private firestore: Firestore = inject(Firestore);
  private organosRef = collection(this.firestore, 'organos');

  constructor() {}

  // Obtener órganos por categoría
  getOrganosByCategoria(categoriaId: string): Observable<Organo[]> {
    if (categoriaId === 'todos') {
      // Si la categoría es "todos", devuelve todos los órganos sin filtrar
      return collectionData(this.organosRef, { idField: 'id' }) as Observable<Organo[]>;
    } else {
      // Filtra los órganos por categoriaId
      const q = query(this.organosRef, where('categoriaId', '==', categoriaId));
      return collectionData(q, { idField: 'id' }) as Observable<Organo[]>;
    }
  }
  // Agregar órgano
  async addOrgano(organo: Organo): Promise<void> {
    await addDoc(this.organosRef, organo);
  }

  // Método para obtener un órgano por su ID
  getOrganoById(organoId: string): Observable<Organo> {
    const organoRef = doc(this.firestore, `organos/${organoId}`);
    return docData(organoRef, { idField: 'id' }) as Observable<Organo>;
  }
}