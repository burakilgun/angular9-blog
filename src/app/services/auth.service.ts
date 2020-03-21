import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = `${environment.baseUrl}/auth`;
  constructor(private httpClient: HttpClient) { }

  isAuthenticated(email: string, password: string) {
    let user = {
      email: email,
      password: password
    }
    return this.httpClient.post<any>(`${this.apiUrl}/IsAuthenticated`, user);
  }
}
