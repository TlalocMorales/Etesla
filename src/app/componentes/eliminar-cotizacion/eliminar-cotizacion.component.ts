import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service';

@Component({
  selector: 'app-eliminar-cotizacion',
  templateUrl: './eliminar-cotizacion.component.html',
  styleUrls: ['./eliminar-cotizacion.component.css']
})
export class EliminarCotizacionComponent implements OnInit {

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

