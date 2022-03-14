import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manga } from 'src/app/model/manga';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-demografias',
  templateUrl: './demografias.component.html',
  styleUrls: ['./demografias.component.css']
})
export class DemografiasComponent implements OnInit {

  public mangas: Manga[];
  public cantidad: number;
  public nombre_demografia: string;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarMangas();
  }

  cargarMangas(): void {
    this.activatedRoute.params.subscribe(params =>{
      let demo = params['demo']
      if(demo){
        this.productoService.getDemografia(demo).subscribe(
          response =>{
            this.nombre_demografia = response.nombre
          }
        )
        this.productoService.getMangasDemografia(demo).subscribe(
          (response) =>{
            this.mangas = response;
            this.cantidad = this.mangas.length;
          }
        )
      }
    })
  }

}
