import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private baseUrl = 'http://127.0.0.1:80/webServicesPHP-Negocio/';

  constructor(private http: HttpClient) { }

  obtenerMeses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}mes.php`);
  }

  obtenerSucursales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}sucursal.php`);
  }

  obtenerDatosVentas(): Observable<any[][]> {
    return this.http.get<any[][]>(`${this.baseUrl}ventas.php`);
  }

  // Método para actualizar los datos en el servidor
  actualizarDatosVentas(nuevosDatos: any[][]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}actualizarVentas.php`, nuevosDatos);
  }
}
