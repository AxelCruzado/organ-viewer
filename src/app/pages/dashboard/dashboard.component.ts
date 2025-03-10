import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Categoria } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para `ngModel`

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categorias: Categoria[] = [];
  nombreCategoria = '';
  descripcionCategoria = '';
  showModal = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.loadCategories(); // ✅ Llama correctamente a la función para cargar categorías
  }

  private loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        
        console.error('Error al cargar categorías:', error);
      },
    });
  }

  abrirModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

  async agregarCategoria() {
    if (!this.nombreCategoria || !this.descripcionCategoria) return;
  
    const nuevaCategoria: Categoria = {
      nombre: this.nombreCategoria,
      descripcion: this.descripcionCategoria
    };
  
    try {
      await this.categoriesService.addCategory(nuevaCategoria);
      this.categorias.push(nuevaCategoria);
      this.loadCategories(); // 🔹 Vuelve a cargar las categorías después de agregar una nueva
      
      // 🔹 Limpiar los campos del formulario
      this.nombreCategoria = '';
      this.descripcionCategoria = '';
  
      // 🔹 Cerrar el modal
      this.cerrarModal();
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  }
  
}
