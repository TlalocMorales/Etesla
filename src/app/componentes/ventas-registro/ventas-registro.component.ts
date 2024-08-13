import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-ventas-registro',
  templateUrl: './ventas-registro.component.html',
  styleUrls: ['./ventas-registro.component.css']
})
export class VentasRegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private administradorService: AdministradorService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^\\w+([.-]?\\w+)*@etesla\\.mx$')]],
      contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      sucursal: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.administradorService.crearAdministrador(this.registroForm.value).subscribe(
        response => {
          console.log('Administrador creado con éxito', response);
          this.router.navigate(['/VentasLogin']);
        },
        error => {
          console.error('Error al crear el administrador', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
