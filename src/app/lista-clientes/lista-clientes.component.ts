import { ClientesService } from './../clientes.service';
import { Clientes } from './../clientes';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent {

  titulo = 'Registrar cliente:';
  cliente: any = null; 

  clientes: Clientes = new Clientes(); 


  constructor(private clientesService: ClientesService, private authService: AuthService) {}



  ngOnInit() {

    this.authService.getLoggedIn();
    this.MostrarTodos();

    console.log(this.authService.getLoggedIn());
  }

  hayRegistros() {
    return this.cliente && this.cliente.length > 0; // Verifica si 'usuario' no es nulo y tiene elementos
  }

  MostrarTodos() {
    this.clientesService.mostrarTodos().subscribe((result: any) => {
      this.cliente = result; 
    });
  }

  Agregar() {
    this.clientesService.agregar(this.clientes).subscribe((datos: any) => {
      if (datos.resultado === 'OK') {
        alert(datos.mensaje);
        this.MostrarTodos();
        this.clientes = {}; // Restablece el objeto clientes a un objeto vacío
      }
    });
  }
  
  

  Eliminar(id_cliente: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
  
    if (confirmacion) {
      this.clientesService.eliminar(id_cliente).subscribe((datos: any) => {
        if (datos.resultado === 'OK') {
          alert(datos.mensaje);
          this.MostrarTodos();
        }
      });
    }
  }
  

  Modificar() {
    console.log("se presiono modificar");
    this.clientesService.update(this.clientes).subscribe((datos: any) => {
      if (datos.resultado === 'OK') {
        alert(datos.mensaje);
        this.MostrarTodos();
      }
    });
  }

  Seleccionar(id_cliente: number) {
    this.clientesService.seleccionar(id_cliente).subscribe((datos: any) => {
      if (datos.length > 0) {
        this.clientes = datos[0];
      }
    });
  }
}
