import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
      private apiUrl = environment.API_URL + '/dashboard';

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
