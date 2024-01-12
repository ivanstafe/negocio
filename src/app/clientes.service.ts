import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'http://127.0.0.1:80/webServicesPHP-Negocio/';

  constructor(private http: HttpClient) { }

  mostrarTodos() {
    return this.http.get(`${this.url}mostrarTodos.php`);
  }

  agregar(cliente: any) { 
    return this.http.post(`${this.url}agregar.php`, JSON.stringify(cliente));
  }

  eliminar(id_cliente: number) {
    return this.http.get(`${this.url}eliminar.php?id_cliente=${id_cliente}`);
  }

  seleccionar(id_cliente: number) {
    return this.http.get(`${this.url}seleccionar.php?id_cliente=${id_cliente}`);
  }

  update(cliente: any) { 
    return this.http.post(`${this.url}update.php`, JSON.stringify(cliente));
  }
}

