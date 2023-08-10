import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito = [];
  subtotal: number = 0;
  total: number = 0;
  descuento: number = 0;
  iconEliminar = faTrash;

  constructor(
    public carritoService: CarritoService,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(!this.authService.estaAutenticado()){
      Swal.fire(
        'No inició sesión',
        'Usted no se encuentra autenticado.',
        'warning'
      );
      this.router.navigate(['/home']);
    }
    this.carrito = this.carritoService.listarCarrito();
    for (let i of this.carrito) {
      this.subtotal = (i.producto.precio * i.cantidad) + this.subtotal;
    }
    this.total = this.subtotal - this.descuento;
    
  }
}
