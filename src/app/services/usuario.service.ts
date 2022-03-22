import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UsuarioRequest } from '../model/usuario-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  private noAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.authService.estaAutenticado()) {
        Swal.fire({
          title: 'Sesión expirada',
          text: 'Su sesión expiró, por favor inicie sesión',
          icon: 'info',
          showConfirmButton: false,
          timer: 1500
        });
        this.authService.cerrarSesion();
      }
      this.router.navigate(['/login']);
      return true
    } else if (e.status == 403) {
      this.router.navigate(['/home']);
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Usted no tiene permiso para ingresar a este recurso',
        icon: 'info',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  private agregarHeaders() {
    let token = this.authService.token;
    if (token != null) {
      return this.HttpHeaders.append('Authorization', 'Bearer ' + token);
    } else {
      return this.HttpHeaders;
    }
  }

  crearUsuario(usuario: UsuarioRequest): Observable<UsuarioRequest> {
    return this.http.post<UsuarioRequest>(
      `${environment.urlApi}/usuarios/registro/cliente`,
      usuario,
      { headers: this.HttpHeaders })
  }
}
