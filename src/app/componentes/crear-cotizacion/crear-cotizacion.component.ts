import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { CotizacionDataService } from 'src/app/shared/cotizacion-data.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cotizacion',
  templateUrl: './crear-cotizacion.component.html',
  styleUrls: ['./crear-cotizacion.component.css']
})
export class CrearCotizacionComponent {

  @ViewChild('cotizacionForm') cotizacionForm!: NgForm;

  cotizacion = {
    nombre: '',
    apellidopa: '',
    apellidoma: '',
    felefono: '',
    celular: '',
    email: '',
    codigopostal: '',
    localidad: '',
    municipio: '',
    estado: '',
    bkWh: '',
    ikWh: '',
    pkWh: '',
    ptranmision: '',
    cmxnkW: '',
    dmxnkW: ''
  };

  constructor(
    private cotizacionService: CotizacionService, 
    private router: Router, 
    private cotizacionDataService: CotizacionDataService
  ) {}

  ngOnInit() {
    console.log('Cargando datos residenciales...');
    this.cargarDatosResidencial();
  }
  

  cargarDatosResidencial() {
    const datosResidenciales = this.cotizacionDataService.getCotizacionData();
    if (datosResidenciales) {
      this.cotizacion = { ...this.cotizacion, ...datosResidenciales };
    }
  }  

  crearCotizacion() {
    const camposInvalidos = Object.values(this.cotizacion).some(value => value.trim() === '');

    if (camposInvalidos) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de guardar la cotización.',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.cotizacionService.createCotizacion(this.cotizacion).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cotización creada',
          text: 'La cotización se ha creado correctamente',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/PanelVentas']);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al crear la cotización',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  resetForm(): void {
    if (this.cotizacionForm) {
      this.cotizacionForm.resetForm();
    }
  }
}
