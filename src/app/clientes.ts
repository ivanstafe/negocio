// Propiedades publicas

// export class Clientes {
//   
//   nombre: string;
//   apellido: string;
//   correo: string;

//   // Constructor
//   constructor(nombre: string, apellido: string, correo: string) {
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.correo = correo;
//   }
// }

// clientes.ts

// clientes.ts

export class Clientes {
  id_cliente?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  numero?: number;

  constructor() {
    // Inicializa las propiedades de la clase con valores por defecto o en blanco
    this.id_cliente = undefined;
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.numero = undefined;
  }
}

