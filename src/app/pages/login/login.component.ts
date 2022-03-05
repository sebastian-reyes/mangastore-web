import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  registrado: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.estaAutenticado()) {
      Swal.fire(
        'Autenticado',
        'Usted ya se encuentra autenticado.',
        'info'
      );
      if ((this.authService.obtenerDatosToken(localStorage.getItem('token')).authorities) == 'ROLE_ADMIN') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  LoginRegistro() {

  }

  login() {
    if (this.usuario.email == null || this.usuario.password == null) {
      Swal.fire(
        'Error en login',
        'Los campos correo y contraseña no pueden estar vacíos.'
        , 'error'
      );
      return;
    }
    else {
      this.authService.login(this.usuario).subscribe(response => {
        console.log(response);
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        if ((this.authService.obtenerDatosToken(response.access_token).authorities) == 'ROLE_ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
        Swal.fire({
          title: 'Inició Sesión',
          text: `Bienvenid@ ${response.nombres}, has iniciado sesión con éxito`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }, err => {
        if (err.status = 400) {
          Swal.fire(
            'Error al autenticarse',
            'Email o contraseña incorrectos.',
            'error'
          )
        }
      })
    }
  }

}
