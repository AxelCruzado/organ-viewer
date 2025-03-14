import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganosService } from '../../services/organos.service';
import { Organo } from '../../../models/organo.model';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-organo-detail',
  standalone: true,
  templateUrl: './organo-detail.component.html',
  styleUrls: ['./organo-detail.component.css'],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrganoDetailComponent {
  organo: Organo | null = null;
  modelUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private organosService: OrganosService
  ) {}

  ngOnInit(): void {
    const organoId = this.route.snapshot.paramMap.get('id');
    if (organoId) {
      this.loadOrgano(organoId);
    }
  }
  
  private loadOrgano(organoId: string): void {
    this.organosService.getOrganoById(organoId).subscribe({
      next: (data) => {
        this.organo = data;
        if (data.archivo) {
          this.modelUrl = data.archivo;
          console.log('Modelo 3D listo:', this.modelUrl);
          // Verifica que la URL se asigna correctamente al HTML
          setTimeout(() => {
            const entity = document.querySelector('a-entity');
            if (entity) {
              console.log('Entidad encontrada:', entity);
              console.log('Atributo gltf-model:', entity.getAttribute('gltf-model'));
            } else {
              console.error('No se encontró la entidad en el DOM');
            }
          }, 1000);
        }
      },
      error: (error) => {
        console.error('Error al cargar el órgano:', error);
      },
    });
  }
}