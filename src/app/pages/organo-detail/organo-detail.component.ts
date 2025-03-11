import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganosService } from '../../services/organos.service';
import { Organo } from '../../../models/organo.model';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-organo-detail',
  standalone: true,
  imports: [ZXingScannerModule], // Importa el módulo del escáner
  templateUrl: './organo-detail.component.html',
  styleUrls: ['./organo-detail.component.css'],
})
export class OrganoDetailComponent implements OnInit {
  organo: Organo | null = null;
  scannerEnabled = false;

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

  private loadOrgano(organoId: string) {
    this.organosService.getOrganoById(organoId).subscribe({
      next: (data) => {
        this.organo = data;
      },
      error: (error) => {
        console.error('Error al cargar el órgano:', error);
      },
    });
  }

  onScanSuccess(result: string) {
    console.log('Código QR escaneado:', result);
    // Aquí puedes manejar el resultado del escaneo
  }
}