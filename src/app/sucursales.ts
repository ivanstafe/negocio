export class Sucursales {

  id_sucursal?: number;
  nombre?: string;
  direccion?: string;
  telefono?: string;


  constructor() {
    // Inicializa las propiedades de la clase con valores por defecto o en blanco
    this.id_sucursal = undefined;
    this.nombre = '';
    this.direccion = '';
    this.telefono = '';
  }
}
