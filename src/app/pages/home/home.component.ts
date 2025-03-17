import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { OrganosService } from '../../services/organos.service';
import { Categoria } from '../../../models/categoria.model';
import { Organo } from '../../../models/organo.model';
import { RouterModule, Router  } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule ], // Importa RouterModule para usar routerLink
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categorias: Categoria[] = [];
  organos: Organo[] = [];
  organosFiltrados: Organo[] = [];
  categoriaSeleccionada: string = 'todos'; // Categoría seleccionada por defecto
  organoSeleccionado: any = null;
  constructor(
    private categoriesService: CategoriesService,
    private organosService: OrganosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categorias = data;
        // Agrega la opción "Todos" al inicio de la lista de categorías
        this.categorias.unshift({ id: 'todos', nombre: 'Todos', descripcion: 'Todas las categorías' });
        this.loadOrganos(); // Carga todos los órganos por defecto
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      },
    });
  }

  private loadOrganos() {
    this.organosService.getOrganosByCategoria('todos').subscribe({
      next: (data) => {
        this.organos = data;
        this.organosFiltrados = [...this.organos]; // Muestra todos los órganos por defecto
      },
      error: (error) => {
        console.error('Error al cargar órganos:', error);
      },
    });
  }

  filtrarPorCategoria(categoriaId: string) {
    this.categoriaSeleccionada = categoriaId; // Actualiza la categoría seleccionada

    if (categoriaId === 'todos') {
      this.organosFiltrados = [...this.organos]; // Muestra todos los órganos
    } else {
      this.organosService.getOrganosByCategoria(categoriaId).subscribe({
        next: (data) => {
          this.organosFiltrados = data; // Muestra los órganos de la categoría seleccionada
        },
        error: (error) => {
          console.error('Error al filtrar órganos:', error);
        },
      });
    }
  }

  abrirModal(organo: any) {
    this.organoSeleccionado = organo;
  }
  cerrarModal() {
    this.organoSeleccionado = null;
  }
  verEn3D() {
    if (this.organoSeleccionado) {
      this.router.navigate(['/organo', this.organoSeleccionado.id]);
      this.cerrarModal();
    }
  }
  
}