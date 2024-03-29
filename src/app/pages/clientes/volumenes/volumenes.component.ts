import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manga } from 'src/app/model/manga';
import { Volumen } from 'src/app/model/volumen';
import { AuthService } from 'src/app/services/auth.service';
import { VolumenesService } from 'src/app/services/volumenes.service';

@Component({
  selector: 'app-volumenes',
  templateUrl: './volumenes.component.html',
  styleUrls: ['./volumenes.component.css']
})
export class VolumenesComponent implements OnInit {

  public volumenes: Volumen[];
  public cantidad: number;
  public manga: Manga;

  constructor(
    private volumenService: VolumenesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarVolumenes();
  }

  cargarVolumenes(): void {
    this.activatedRoute.params.subscribe(params => {
      let nombre_manga = params['nombre_manga']
      if (nombre_manga) {
        this.volumenService.getManga(nombre_manga).subscribe(
          response => {
            this.manga = response;
          }
        )
        this.volumenService.getVolumenesManga(nombre_manga).subscribe(
          (response) => {
            this.volumenes = response;
            this.cantidad = this.volumenes.length;
          }
        )
      }
    })
  }

}
