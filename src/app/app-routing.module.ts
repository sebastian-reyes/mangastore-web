import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CarritoComponent } from './pages/clientes/carrito/carrito.component';
import { DemografiasComponent } from './pages/clientes/demografias/demografias.component';
import { HomeComponent } from './pages/clientes/home/home.component';
import { VolumenComponent } from './pages/clientes/volumen/volumen.component';
import { VolumenesComponent } from './pages/clientes/volumenes/volumenes.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demografia/:demo', component: DemografiasComponent },
  { path: 'catalogo/volumenes/:nombre_manga', component: VolumenesComponent },
  { path: 'catalogo/volumenes/:nombre_manga/:nombre_volumen', component: VolumenComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
