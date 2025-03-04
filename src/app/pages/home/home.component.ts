import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'digestivo', nombre: 'Sistema Digestivo' },
    { id: 'respiratorio', nombre: 'Sistema Respiratorio' },
    { id: 'circulatorio', nombre: 'Sistema Circulatorio' }
  ];

  organos = [
    { nombre: 'Corazón', descripcion: 'Órgano principal del sistema circulatorio.', imagen: 'https://source.unsplash.com/300x200/?heart', categoria: 'circulatorio' },
    { nombre: 'Pulmones', descripcion: 'Órgano del sistema respiratorio.', imagen: 'https://source.unsplash.com/300x200/?lungs', categoria: 'respiratorio' },
    { nombre: 'Estómago', descripcion: 'Órgano del sistema digestivo.', imagen: 'https://source.unsplash.com/300x200/?stomach', categoria: 'digestivo' }
  ];

  organosFiltrados = [...this.organos];

  constructor() {}

  ngOnInit(): void {}

  filtrarPorCategoria(categoria: string) {
    this.organosFiltrados = categoria === 'todos' 
      ? [...this.organos] 
      : this.organos.filter(organo => organo.categoria === categoria);
  }
}
