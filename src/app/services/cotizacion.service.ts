import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private URL= "http://localhost:8080/api/cotizaciones";

  constructor(private httpClient: HttpClient) { }
  
  public getAllCotizaciones(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public getCotizacion(id: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + id);
  }

  public createCotizacion(cotizacion: any): Observable<any> {
    return this.httpClient.post(this.URL, cotizacion);
  }

  public deleteCotizacion(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/" + id);
  }

  public updateCotizacion(id: any, cotizacion: any): Observable<any> {
    return this.httpClient.put(this.URL + "/" + id, cotizacion);
  }
}
