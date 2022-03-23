import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(
    public carritoService: CarritoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.listarCarrito();
    for (let i of this.carrito) {
      this.total = i.producto.precio * i.cantidad + this.total;
    }
  }

}
