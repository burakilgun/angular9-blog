import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "http://localhost:5000/api/auth";
  constructor(private httpClient: HttpClient) { }

  isAuthenticated(email: string, password: string) {
    let user = {
      email: email,
      password: password
    }
    return this.httpClient.post<any>(`${this.apiUrl}/IsAuthenticated`, user);
  }
}
