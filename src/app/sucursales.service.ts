import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  url = 'http://127.0.0.1:80/webServicesPHP-Negocio/';

  constructor(private http: HttpClient) { }

  mostrarTodos() {
    return this.http.get(`${this.url}mostrarTodosSucursal.php`);
  }

  agregar(sucursal: any) { 
    return this.http.post(`${this.url}agregarSucursal.php`, JSON.stringify(sucursal));
  }

  eliminar(id_sucursal: number) {
    return this.http.get(`${this.url}eliminarSucursal.php?id_sucursal=${id_sucursal}`);
  }

  seleccionar(id_sucursal: number) {
    return this.http.get(`${this.url}seleccionarSucursal.php?id_sucursal=${id_sucursal}`);
  }

  update(sucursal: any) { 
    return this.http.post(`${this.url}updateSucursal.php`, JSON.stringify(sucursal));
  }
}

