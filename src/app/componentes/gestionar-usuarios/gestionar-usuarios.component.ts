import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css']
})
export class GestionarUsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.administradorService.obtenerTodosLosAdministradores().subscribe(
      (data: any[]) => {
        // Ajustar la propiedad a 'contrasena' si es necesario
        this.usuarios = data.map(usuario => ({
          ...usuario,
          contrasena: usuario.contraseña
        }));
      },
      error => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
}
