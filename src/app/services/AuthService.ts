import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7225';
  public tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

  public login(loginData: any): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/api/account/login`,
      loginData,
      { responseType: 'text' as 'json' }
    );
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) != null;
  }
}
