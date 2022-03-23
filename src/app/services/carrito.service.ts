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

  agregarProducto(producto: Volumen, cantidad: number) {
    this.carrito.push({ producto, cantidad });
    /*
    let agregado = false;
    for (let i of this.carrito) {
      if (i.producto.id_producto === producto.id_producto) {
      }else{
        
        break;
      }
    }
    if(ag){
    }
    */
    this.guardarCarrito();
  }

  limpiarCarrito() {
    this.carrito = [];
    localStorage.removeItem('carrito');
    Swal.fire({
      title: 'Carrito vacío',
      showConfirmButton: false,
      timer: 1000,
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
