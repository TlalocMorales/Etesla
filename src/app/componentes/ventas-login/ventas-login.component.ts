import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service.ts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-login',
  templateUrl: './ventas-login.component.html',
  styleUrls: ['./ventas-login.component.css']
})
export class VentasLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      branch: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, contraseña, branch } = this.loginForm.value;
      this.authService.login(email, contraseña).subscribe(
        response => {
          console.log('Login exitoso', response);
          Swal.fire({
            title: 'Login Exitoso',
            text: 'Has iniciado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/PanelVentas']);
          });
        },
        error => {
          console.error('Error al iniciar sesión', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al iniciar sesión. Por favor, verifica tus credenciales e intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
