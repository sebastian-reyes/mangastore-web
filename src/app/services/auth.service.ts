import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && localStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    } else {
      return new Usuario();
    }
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token');
      return this._token;
    }
  }

  tieneRol(rol: string): boolean {
    if (this.usuario.roles.includes(rol)) {
      return true;
    } else {
      return false;
    }
  }

  login(usuario: Usuario): Observable<any> {
    const url_login = `${environment.urlApi}/oauth/token`;
    const credenciales = btoa("mangastore-webapp" + ":" + "m4ng4st0r3!");
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    })

    let params = new URLSearchParams();
    params.set('username', usuario.email);
    params.set('password', usuario.password);
    params.set('grant_type', 'password');

    return this.http.post(url_login, params.toString(), { headers: httpHeaders });
  }

  cerrarSesion(): void {
    this._token = null;
    this._usuario = null;
    localStorage.removeItem('carrito');
    localStorage.clear();
  }

  obtenerDatosToken(access_token: string): any {
    if (access_token != null) {
      return this.parseJwt(access_token);
    }
  }

  guardarUsuario(access_token: string): any {
    let payload = this.obtenerDatosToken(access_token);
    this._usuario = new Usuario();
    this._usuario.nombres = payload.nombres;
    this._usuario.apellidos = payload.apellidos;
    this._usuario.email = payload.user_name;
    this._usuario.roles = payload.authorities;
    localStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(access_token: string): any {
    this._token = access_token;
    localStorage.setItem('token', this._token);
  }

  estaAutenticado(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
}
