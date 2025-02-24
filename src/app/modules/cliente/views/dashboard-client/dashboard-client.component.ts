import { DashboardService } from './../../../shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
  userData: any = {};

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Simulación de obtener datos del cliente (nivel, puntos, cupones disponibles).
    // Puede ser de localStorage, un endpoint "getProfile", etc.
   this.loadClientDashboard();
  }

  loadClientDashboard() {
    this.dashboardService.getClientDashboard().subscribe({
      next: (res: any) => {
        this.userData = res;
      },
      error: (err) => {
        console.error('Error al obtener indicadores del cliente', err);
      }
    });
  }

}
