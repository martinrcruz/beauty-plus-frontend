import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
      private apiUrl = environment.API_URL + '/users';

  constructor(private http: HttpClient) {}

  getProfile() :Observable<any>{
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.apiUrl}/profile`, data);
  }
}
