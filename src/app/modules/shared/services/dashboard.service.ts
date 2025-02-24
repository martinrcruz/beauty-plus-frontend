import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:4000/api/dashboard';

  constructor(private http: HttpClient) {}

  getClientDashboard() {
    return this.http.get(`${this.apiUrl}/client`);
  }

  getReceptionistDashboard() {
    return this.http.get(`${this.apiUrl}/receptionist`);
  }

  getAdminDashboard() {
    return this.http.get(`${this.apiUrl}/admin`);
  }
}
