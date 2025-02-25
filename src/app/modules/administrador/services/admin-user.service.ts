import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
    private apiUrl = environment.API_URL + '/users';
  

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  createUser(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }
  

  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
