import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl = 'http://localhost:8080/api/administradores'; // Ajusta la URL base según tu backend

  constructor(private http: HttpClient) { }

  obtenerTodosLosAdministradores(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  obtenerAdministradorPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  crearAdministrador(administrador: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, administrador);
  }

  actualizarAdministrador(id: number, administrador: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, administrador);
  }

  eliminarAdministrador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
