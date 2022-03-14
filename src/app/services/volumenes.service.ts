import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Manga } from '../model/manga';
import { Volumen } from '../model/volumen';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VolumenesService {

  private HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private agregarHeaders() {
    let token = this.authService.token;
    if (token != null) {
      return this.HttpHeaders.append('Authorization', 'Bearer ' + token);
    } else {
      return this.HttpHeaders;
    }
  }

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
      return true;
    } else if (e.status = 403) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Usted no tiene permiso para ingresar a este recurso',
        icon: 'info',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/home']);
    }
  }

  getVolumenesManga(id_vol: number): Observable<Volumen[]> {
    return this.http.get(`${environment.urlApi}/mangas/${id_vol}`).pipe(
      map((response) => response["volumenes"] as Volumen[]),
      catchError(e => {
        if (this.noAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }

  getManga(id_vol): Observable<Manga>{
    return this.http.get(`${environment.urlApi}/mangas/${id_vol}`).pipe(
      map((response) => response as Manga),
      catchError(e => {
        if (this.noAutorizado(e)) {
          return throwError(e);
        }
      })
    );
  }
}
