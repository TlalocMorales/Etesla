import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router
import { VendedorService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-admin-registro',
  templateUrl: './admin-registro.component.html',
  styleUrls: ['./admin-registro.component.css']
})
export class AdminRegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vendedorService: VendedorService, // Inyecta el servicio
    private router: Router // Inyecta Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(10)]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], // Agrega validaciones si es necesario
      email: ['', [Validators.required, Validators.email, Validators.pattern('^\\w+([.-]?\\w+)*@etesla\\.mx$')]],
      contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      sucursal: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario válido', this.registroForm.value);
      this.vendedorService.crearVendedor(this.registroForm.value).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/AdminLogin']); // Redirige a la vista de inicio de sesión
        },
        (error) => {
          console.error('Error al registrar', error);
          // Manejo de errores, si es necesario
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  validateAlpha(event: KeyboardEvent) {
    const charCode = event.charCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
