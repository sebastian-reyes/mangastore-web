import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Volumen } from '../model/volumen';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: Array<{ producto: Volumen, cantidad: number }>;
  cantidad: number = 0;

  constructor(public router: Router) {
    this.carrito = new Array<{ producto: Volumen, cantidad: number }>();
    if (this.cargarCarrito()?.length > 0) {
      let dataCarrito = this.cargarCarrito();
      this.carrito = dataCarrito;
    }
  }

  agregarProducto(producto: Volumen, cantidad: number): void {
    if (this.carrito.length > 0) {
      let index = -1;
      for (let i = 0; i < this.carrito.length; i++) {
        const element = this.carrito[i];
        if (element.producto.id_volumen === producto.id_volumen) {
          index = i;
          break;     
        }
      }
      if (index == -1) {
        this.carrito.push({ producto, cantidad });
        this.guardarCarrito();
      } else {
        let prod = this.carrito[index];
        prod.cantidad++;
      }
    } else {
      this.carrito.push({ producto, cantidad });
      this.guardarCarrito();
    }
  }

  limpiarCarrito() {
    this.carrito = [];
    localStorage.removeItem('carrito');
    Swal.fire({
      title: 'Carrito vacío',
      showConfirmButton: false,
      timer: 1300,
      icon: 'success'
    });
    window.location.reload();
    this.listarCarrito();
  }

  guardarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  cargarCarrito() {
    return <Array<{ producto: Volumen, cantidad: number }>>JSON.parse(localStorage.getItem('carrito')!);
  }

  listarCarrito() {
    return this.carrito;
  }

}
