import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard-receptionist',
  templateUrl: './dashboard-receptionist.component.html',
  styleUrls: ['./dashboard-receptionist.component.scss']
})
export class DashboardReceptionistComponent implements OnInit {
  receptionistData: any = {};

  constructor(
    private dashboardService:DashboardService
  ) {}

  ngOnInit(): void {
    // Ejemplo simulado: data para la recepcionista (compras diarias, total€, etc.)
    this.loadReceptionistDashboard()
  }

  loadReceptionistDashboard() {
    this.dashboardService.getReceptionistDashboard().subscribe({
      next: (res: any) => {
        this.receptionistData = res;
      },
      error: (err) => {
        console.error('Error al obtener indicadores de admin', err);
      }
    });
  }
}
