import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private firestore: Firestore = inject(Firestore); // ✅ Usa inject() para la inyección
  private categoriesRef = collection(this.firestore, 'categorias'); // ✅ Inicialización directa

  getCategories(): Observable<Categoria[]> {
    const categoriesQuery = query(this.categoriesRef, orderBy('nombre'));
    return collectionData(categoriesQuery, { idField: 'id' }) as Observable<Categoria[]>;
  }

  async addCategory(categoria: Categoria): Promise<void> {
    await addDoc(this.categoriesRef, categoria);
  }
}