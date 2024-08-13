import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CotizacionDataService } from 'src/app/shared/cotizacion-data.service';

@Component({
  selector: 'app-detalle-comercio',
  templateUrl: './detalle-comercio.component.html',
  styleUrls: ['./detalle-comercio.component.css']
})
export class DetalleComercioComponent {
  cotizacion = {
    nombre: 'Nombre Aleatorio',
    bkWh: '100',
    ikWh: '200',
    pkWh: '300',
    ptranmision: '50',
    cmxnkW: '20',
    dmxnkW: '30'
  };

  constructor(
    private cotizacionDataService: CotizacionDataService,
    private router: Router
  ) {}

  ngOnInit() {
    const datosGuardados = this.cotizacionDataService.getCotizacionData();
    if (datosGuardados) {
      this.cotizacion = datosGuardados;
    }
  }

  actualizarCotizacion() {
    this.cotizacionDataService.setCotizacionData(this.cotizacion);
    console.log('Datos actualizados:', this.cotizacion);
  }

  cargarDatosResidencial() {
    this.cotizacionDataService.setCotizacionData(this.cotizacion);
    this.router.navigate(['/crear-cotizacion']);
  }

  onCancel() {
    this.router.navigate(['/GestionarProductos']);
  }
}
