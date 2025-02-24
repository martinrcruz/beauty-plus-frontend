import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private apiUrl = 'http://localhost:4000/api/users';

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
