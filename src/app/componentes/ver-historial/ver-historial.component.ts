import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-ver-historial',
  templateUrl: './ver-historial.component.html',
  styleUrls: ['./ver-historial.component.css']
})
export class VerHistorialComponent implements OnInit {

  cotizaciones: any[] = []; // Cambia el tipo según el modelo de tu cotización

  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  cargarCotizaciones(): void {
    this.cotizacionService.getAllCotizaciones().subscribe(
      (data: any[]) => {
        this.cotizaciones = data;
      },
      error => {
        console.error('Error al cargar las cotizaciones', error);
      }
    );
  }
}
