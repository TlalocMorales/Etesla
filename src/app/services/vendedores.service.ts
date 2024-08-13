import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  private baseUrl = 'http://localhost:8080/api/vendedores'; // Ajusta la URL base según tu backend

  constructor(private http: HttpClient) { }

  obtenerTodosLosVendedores(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  obtenerVendedorPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  crearVendedor(vendedor: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, vendedor);
  }

  actualizarVendedor(id: number, vendedor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, vendedor);
  }

  eliminarVendedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
