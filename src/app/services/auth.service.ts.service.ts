import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { correo, contrasena };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers, responseType: 'text' }).pipe(
      tap((response: any) => {
        if (response) {
          localStorage.setItem(this.tokenKey, response);
        }
      })
    );
  }

  verifyToken(token: string): Observable<any> {
    const url = `${this.apiUrl}/verify`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, {}, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
