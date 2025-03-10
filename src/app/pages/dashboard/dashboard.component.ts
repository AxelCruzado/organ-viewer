import { Component, OnInit, inject } from '@angular/core';
import { OrganosService } from '../../services/organos.service';
import { CategoriesService } from '../../services/categories.service';
import { Categoria } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para `ngModel`
import { Organo } from '../../../models/organo.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  categorias: Categoria[] = [];
  organos: { [categoriaId: string]: Organo[] } = {};

  // Variables para el modal de categoria
  nombreCategoria = '';
  descripcionCategoria = '';

  //Modal Categoria & Organo

  showModalCategoria = false;
  showModalOrgano = false;

  //Active Section
  activeSection: 'categorias' | 'organos' = 'categorias';

  // Variables para el modal de órgano
  nombreOrgano = '';
  descripcionOrgano = '';
  imagenOrgano: File | null = null;
  archivoOrgano: File | null = null;
  categoriaSeleccionada: string | null = null;

  constructor(
    private categoriesService: CategoriesService,
    private organosService: OrganosService
  ) {}

  ngOnInit() {
    this.loadCategories(); // ✅ Llama correctamente a la función para cargar categorías
  }

  private loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categorias = data;
        // Cargar órganos para cada categoría
        this.categorias.forEach((categoria) => {
          this.loadOrganosByCategoria(categoria.id!);
        });
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      },
    });
  }

  private loadOrganosByCategoria(categoriaId: string) {
    this.organosService.getOrganosByCategoria(categoriaId).subscribe({
      next: (data) => {
        this.organos[categoriaId] = data;
      },
      error: (error) => {
        console.error('Error al cargar órganos:', error);
      },
    });
  }

  abrirModalCategoria() {
    this.showModalCategoria = true;
  }

  cerrarModalCategoria() {
    this.showModalCategoria = false;
  }

  abrirModalOrgano(categoriaId: string) {
    this.categoriaSeleccionada = categoriaId;
    this.showModalOrgano = true;
  }

  cerrarModalOrgano() {
    this.showModalOrgano = false;
    this.categoriaSeleccionada = null;
    this.nombreOrgano = '';
    this.descripcionOrgano = '';
    this.imagenOrgano = null;
    this.archivoOrgano = null;
  }

  async agregarCategoria() {
    if (!this.nombreCategoria || !this.descripcionCategoria) return;

    const nuevaCategoria: Categoria = {
      id: '',
      nombre: this.nombreCategoria,
      descripcion: this.descripcionCategoria,
    };

    try {
      await this.categoriesService.addCategory(nuevaCategoria);
      this.categorias.push(nuevaCategoria);
      this.loadCategories(); // 🔹 Vuelve a cargar las categorías después de agregar una nueva

      // 🔹 Limpiar los campos del formulario
      this.nombreCategoria = '';
      this.descripcionCategoria = '';

      // 🔹 Cerrar el modal
      this.cerrarModalCategoria();
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  }

  async agregarOrgano() {
    if (
      !this.nombreOrgano ||
      !this.descripcionOrgano ||
      !this.categoriaSeleccionada
    )
      return;

    const nuevoOrgano: Organo = {
      id: '',
      nombre: this.nombreOrgano,
      descripcion: this.descripcionOrgano,
      categoriaId: this.categoriaSeleccionada,
      imagen: this.imagenOrgano || null,
      archivo: this.archivoOrgano || null,
    };

    try {
      await this.organosService.addOrgano(nuevoOrgano);
      this.loadOrganosByCategoria(this.categoriaSeleccionada); // Recargar órganos
      this.cerrarModalOrgano();
    } catch (error) {
      console.error('Error al agregar órgano:', error);
    }
  }

  onFileChange(event: Event, type: 'imagen' | 'archivo') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (type === 'imagen' && this.isImageFile(file)) {
        this.imagenOrgano = file;
      } else if (type === 'archivo') {
        this.archivoOrgano = file;
      }
    }
  }
  private isImageFile(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    return allowedTypes.includes(file.type);
  }

  // Método para cambiar la sección activa
  setActiveSection(section: 'categorias' | 'organos') {
    this.activeSection = section;
  }
}
