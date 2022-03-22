import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioRequest } from 'src/app/model/usuario-request';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  registrado: boolean = true;
  nuevoUsuario: UsuarioRequest = new UsuarioRequest();

  constructor(
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService
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
    if (this.registrado == true) {
      this.registrado = false;
    } else {
      this.registrado = true;
    }
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

  registrar():void {
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
      response =>{
        this.router.navigate(['/login']);
        Swal.fire({
          title: 'Usuario registrado correctamente',
          text: 'Gracias por registrarte con nosotros',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.registrado = true;
      }
    )
  }

}
