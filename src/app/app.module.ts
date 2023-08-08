import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/clientes/navbar/navbar.component';
import { HomeComponent } from './pages/clientes/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FooterComponent } from './pages/clientes/footer/footer.component';
import { DemografiasComponent } from './pages/clientes/demografias/demografias.component';
import { VolumenesComponent } from './pages/clientes/volumenes/volumenes.component';
import { VolumenComponent } from './pages/clientes/volumen/volumen.component';
import { CarritoComponent } from './pages/clientes/carrito/carrito.component';
import { BarraDemografiasComponent } from './pages/clientes/barra-demografias/barra-demografias.component';
import { SidebarComponent } from './pages/admin/dashboard/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    DemografiasComponent,
    VolumenesComponent,
    VolumenComponent,
    CarritoComponent,
    BarraDemografiasComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
