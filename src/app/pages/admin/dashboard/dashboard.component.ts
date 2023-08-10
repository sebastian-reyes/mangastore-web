import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.estaAutenticado()) {
      Swal.fire(
        'No inició sesión',
        'Usted no se encuentra autenticado.',
        'warning'
      );
      this.router.navigate(['/home']);
    }
    if ((this.authService.obtenerDatosToken(localStorage.getItem('token')).authorities) != 'ROLE_ADMIN') {
      Swal.fire(
        'Recurso prohibido',
        'Usted no cuenta con privilegios para ingresar a este recurso.',
        'warning'
      );
      this.router.navigate(['/home']);
    }
  }

}
