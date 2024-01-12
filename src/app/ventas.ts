export class Ventas {
    id?: number;
    mes?: string;
    sucursal?: string;
    monto?: number;
  
    constructor() {
      this.id = undefined;
      this.mes = '';
      this.sucursal = '';
      this.monto = 0; // Cambiado a 0 para que coincida con el tipo de la propiedad
    }
  }
  