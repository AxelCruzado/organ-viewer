export interface Organo {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: File | null; // Permitir null
    archivo: File | null; // Permitir null
    categoriaId: string;
  }