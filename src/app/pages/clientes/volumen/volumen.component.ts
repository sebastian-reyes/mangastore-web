import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Volumen } from 'src/app/model/volumen';
import { AuthService } from 'src/app/services/auth.service';
import { VolumenesService } from 'src/app/services/volumenes.service';

@Component({
  selector: 'app-volumen',
  templateUrl: './volumen.component.html',
  styleUrls: ['./volumen.component.css']
})
export class VolumenComponent implements OnInit {

  public volumen: Volumen;

  constructor(
    private volumenService: VolumenesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getVolumen();
  }

  getVolumen():void{
    this.activatedRoute.params.subscribe(params => {
      let nombre_volumen = params['nombre_volumen']
      if (nombre_volumen) {
        this.volumenService.getVolumen(nombre_volumen).subscribe(
          response => {
            this.volumen = response;
          }
        )
      }
    })
  }

}
