import { SucursalesService } from './../sucursales.service';
import { Sucursales } from './../sucursales';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  styleUrls: ['./lista-sucursales.component.css']
})
export class ListaSucursalesComponent {
  titulo = 'Registrar sucursal:';
  sucursal: any = null; 

  sucursales: Sucursales = new Sucursales(); 


  constructor(private sucursalesService: SucursalesService) {}

  ngOnInit() {
    this.MostrarTodos();
  }

  hayRegistros() {
    return this.sucursal && this.sucursal.length > 0; // Verifica si 'usuario' no es nulo y tiene elementos
  }

  MostrarTodos() {
    this.sucursalesService.mostrarTodos().subscribe((result: any) => {
      this.sucursal = result; 
    });
  }

  Agregar() {
    this.sucursalesService.agregar(this.sucursales).subscribe((datos: any) => {
      if (datos.resultado === 'OK') {
        alert(datos.mensaje);
        this.MostrarTodos();
        this.sucursales = {}; // Restablece el objeto clientes a un objeto vacío
      }
    });
  }
  
  

  Eliminar(id_sucursal: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta sucursal?');
  
    if (confirmacion) {
      this.sucursalesService.eliminar(id_sucursal).subscribe((datos: any) => {
        if (datos.resultado === 'OK') {
          alert(datos.mensaje);
          this.MostrarTodos();
        }
      });
    }
  }
  

  Modificar() {
    console.log("se presiono modificar");
    this.sucursalesService.update(this.sucursales).subscribe((datos: any) => {
      if (datos.resultado === 'OK') {
        alert(datos.mensaje);
        this.MostrarTodos();
      }
    });
  }

  Seleccionar(id_sucursal: number) {
    this.sucursalesService.seleccionar(id_sucursal).subscribe((datos: any) => {
      if (datos.length > 0) {
        this.sucursales = datos[0];
      }
    });
  }
}
