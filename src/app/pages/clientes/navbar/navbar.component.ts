import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping, faPerson, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iconCarrito = faCartShopping
  iconProfile = faUserAlt

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    Swal.fire(
      'Cerró Sesión',
      'Usted cerró sesión con éxito, regrese pronto',
      'info'
    )
    this.router.navigate(['/login']);
  }
}
