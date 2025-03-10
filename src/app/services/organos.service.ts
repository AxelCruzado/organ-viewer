// services/organos.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, where } from '@angular/fire/firestore';
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
    const q = query(this.organosRef, where('categoriaId', '==', categoriaId));
    return collectionData(q, { idField: 'id' }) as Observable<Organo[]>;
  }

  // Agregar un nuevo órgano
  async addOrgano(organo: Organo): Promise<void> {
    await addDoc(this.organosRef, organo);
  }
}