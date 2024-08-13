import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aprobar-cotizacion',
  templateUrl: './aprobar-cotizacion.component.html',
  styleUrls: ['./aprobar-cotizacion.component.css']
})
export class AprobarCotizacionComponent implements OnInit {

  cotizacion: any = {}; // Cambia el tipo según el modelo de tu cotización

  constructor(
    private cotizacionService: CotizacionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.cargarCotizacion(id);
    });
  }

  cargarCotizacion(id: number): void {
    this.cotizacionService.getCotizacion(id).subscribe(
      (data: any) => {
        this.cotizacion = data;
      },
      error => {
        console.error('Error al cargar la cotización', error);
      }
    );
  }

  aprobarCotizacion(): void {
    // Llamar al servicio para crear la cotización
    this.cotizacionService.createCotizacion(this.cotizacion).subscribe(
      (response: any) => {
        // Manejar la respuesta de la API (ejemplo: mostrar un mensaje de éxito)
        console.log('Cotización aprobada con éxito', response);
        // Redirigir a otra vista si es necesario
        this.router.navigate(['/PanelAdmin']);
      },
      error => {
        // Manejar el error (ejemplo: mostrar un mensaje de error)
        console.error('Error al aprobar la cotización', error);
      }
    );
  }
  

  rechazarCotizacion(): void {
    // Lógica para rechazar la cotización
    console.log('Rechazar cotización', this.cotizacion);
  }
}
