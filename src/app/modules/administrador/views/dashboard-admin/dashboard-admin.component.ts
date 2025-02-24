import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  adminData: any = {};

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadAdminDashboard()
  }

  loadAdminDashboard() {
    this.dashboardService.getAdminDashboard().subscribe({
      next: (res: any) => {
        this.adminData = res;
      },
      error: (err) => {
        console.error('Error al obtener indicadores de admin', err);
      }
    });
  }
}
