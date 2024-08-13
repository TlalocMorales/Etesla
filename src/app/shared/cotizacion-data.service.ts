import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CotizacionDataService {
  private cotizacionData: any = null;

  setCotizacionData(data: any) {
    this.cotizacionData = data;
  }

  getCotizacionData() {
    return this.cotizacionData;
  }
}
