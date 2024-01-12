import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ListaSucursalesComponent } from './lista-sucursales/lista-sucursales.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { VentasComponent } from './ventas/ventas.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaClientesComponent,
    ListaSucursalesComponent,
    LoginComponent,
    NavbarComponent,
    VentasComponent,
    ListaVentasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Agrega HttpClientModule aquí
    FormsModule, // Agrega FormsModule aquí
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
