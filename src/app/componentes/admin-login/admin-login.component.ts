import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service.ts.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      branch: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, contraseña } = this.loginForm.value;
      this.authService.login(email, contraseña).subscribe(
        response => {
          console.log('Login exitoso', response);
          // Mostrar alerta de éxito
          Swal.fire({
            title: 'Login Exitoso',
            text: 'Has iniciado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Redirigir al panel de administrador después de cerrar el popup
            this.router.navigate(['/PanelAdmin']);
          });
        },
        error => {
          console.error('Error al iniciar sesión', error);
          // Mostrar alerta de error
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

  validateAlpha(event: KeyboardEvent) {
    const charCode = event.charCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  validateDomain(control: any) {
    const email = control.value;
    if (email && email.indexOf('@') != -1) {
      const [_, domain] = email.split('@');
      if (domain !== 'vendedor.mx') {
        return { domain: true };
      }
    }
    return null;
  }
}
