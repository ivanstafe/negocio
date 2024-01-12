import { Component } from '@angular/core';
import { VentasService } from './../ventas.service';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent {
  ventasData: any[] = [];
  sucursales: string[] = [];
  meses: string[] = [];

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.ventasService.obtenerDatosVentas().subscribe((data: any[]) => {
      console.log('Datos crudos:', data);
      for (let i = 0; i < data.length; i++) {
        for (const key in data[i]) {
          if (data[i].hasOwnProperty(key)) {
            console.log(`Valor en ${key}:`, data[i][key]);
          }
        }
      }
      this.ventasData = data;
      this.cargarNombresMeses();
      console.log('Ventas cargadas:', this.ventasData);
    });

    this.ventasService.obtenerSucursales().subscribe((sucursales: string[]) => {
      this.sucursales = sucursales;
      console.log('Nombres de Sucursales:', this.sucursales);
    });
  }

  cargarNombresMeses(): void {
    this.ventasService.obtenerMeses().subscribe((meses: string[]) => {
      this.meses = meses;
      console.log('Nombres de Meses:', this.meses);
    });
  }

  guardarDato(i: number, sucursal: string): void {
    const mes = this.meses[i];
    const newValue = this.ventasData[i][sucursal];
  
    let mostrarMensajeExito = false;
  
    // Verificar si newValue es un número válido
    if (isNaN(newValue)) {
      alert('El valor ingresado no es válido. Debe ser un número.');
    } else {
      // Estructura los datos como un arreglo bidimensional
      const updatedData: any[][] = [
        [mes, newValue, sucursal]
      ];
  
      this.ventasService.actualizarDatosVentas(updatedData).subscribe(
        (response) => {
          // Maneja la respuesta del servidor, muestra un mensaje de confirmación, etc.
          mostrarMensajeExito = true;
        },
        (error) => {
          // Maneja errores, muestra mensajes de error, etc.
          alert('Se produjo un error al guardar los datos.');
        }
      );
    }
  
    if (mostrarMensajeExito) {
      alert('Datos guardados con éxito.');
    } else {
      mostrarMensajeExito = false; // Restablecer la bandera
    }
  }
  
  
  
  onEnter(event: any, rowIndex: number, sucursal: string) {
    if (event.keyCode === 13) {
      this.guardarDato(rowIndex, sucursal);
      alert('Datos guardados con éxito.'); // Agrega la alerta
    }
  }
  
}
