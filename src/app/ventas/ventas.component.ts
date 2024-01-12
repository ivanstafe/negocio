import { Component, OnInit } from '@angular/core';
import { VentasService } from './../ventas.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventasData: any[] = [];
  titulo = "Datos de Ventas";
  sucursales: string[] = [];
  meses: string[] = []; 

  svgContent: SafeHtml = ''


  constructor(private ventasService: VentasService, private sanitizer: DomSanitizer) { }

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
      this.crearGraficoBarras();
      console.log('Ventas cargadas:', this.ventasData);
    });
  
    this.ventasService.obtenerSucursales().subscribe((sucursales: string[]) => {
      this.sucursales = sucursales;
      console.log('Nombres de Sucursales:', this.sucursales);
    });
  }
  
  cargarNombresMeses(): void {
    // Obtener los nombres de los meses desde el servicio
    this.ventasService.obtenerMeses().subscribe((meses: string[]) => {
      this.meses = meses;
      console.log('Nombres de Meses:', this.meses);
    });
  }

  crearGraficoBarras(): void {
    console.log('Valor máximo antes de generar SVG:', this.findMax()); 
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.generarSVG());
  
    console.log('Valor máximo después de generar SVG:', this.findMax()); 
  }
  
 
  generarSVG(): string {
    const max = this.findMax();
    const sucursales = 5;
    const filas = 12;
    const barWidth = 10;
    const barSpacing = 0;
    const totalBars = filas * sucursales;

    // Calcular el ancho y alto del gráfico en función de las columnas y barras
    const svgWidth = totalBars * (barWidth + barSpacing);
    const svgHeight = 400; // Altura del gráfico 

    // Establecer el viewBox para que se ajuste a la cuadrícula de 12x5
    const viewBox = `0 0 ${svgWidth} ${svgHeight}`;

    let svgContent = `<svg width="${svgWidth}px" height="${svgHeight}px" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">\n`;

    // Genera la etiqueta del mes una vez por grupo de columnas
    for (let j = 0; j < filas; j++) {
        const monthLabel = this.getMonthName(j);
        const monthX = (barWidth + barSpacing) * (sucursales - 1) / 2 + j * (barWidth + barSpacing) * sucursales;
        svgContent += `<text x="${monthX}" y="${svgHeight + 20}" font-size="12" text-anchor="middle" fill="black">${monthLabel}</text>\n`;
    }

    for (let s = 0; s < sucursales; s++) {
        for (let i = s; i < totalBars; i += sucursales) {
            const j = Math.floor(i / sucursales); // Calcular la fila
            const xValue = parseFloat(this.ventasData[j][`sucursal${s + 1}`]); // Parseado a número

            if (!isNaN(xValue) && !isNaN(max)) {
                const rectX = (barWidth + barSpacing) * i; // Espaciado entre barras
                const rectY = svgHeight - (xValue / max) * svgHeight; // Escala los valores a la altura del gráfico
                const rectHeight = (xValue / max) * svgHeight; // Altura de la barra
                const colors = ['rgb(255,0,0)', 'rgb(0,0,255)', 'rgb(0,255,0)', 'rgb(255,255,0)', 'rgb(255,0,255)'];

                if (s === 2) { // Para la tercera sucursal
                    // Agrega la etiqueta del mes sobre la tercera barra de cada grupo
                    const monthLabel = this.getMonthName(j);
                    svgContent += `<text x="${rectX + barWidth / 2}" y="${rectY - 25}" font-size="10" text-anchor="middle" fill="black">${monthLabel}</text>\n`;
                }

                svgContent += `<rect x="${rectX}" y="${rectY}" width="${barWidth}" height="${rectHeight}" fill="${colors[s]}" />\n`;
            } else {
                console.error('Valores no válidos');
            }
        }
    }

    svgContent += '</svg>';
    console.log('SVG generado:', svgContent);

    return svgContent;
}




getMonthName(index: number): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[index];
}

  findMax(): number {
    let max = 0; // Inicializa max en 0
    this.ventasData.forEach((venta) => {
      for (const sucursal in venta) {
        if (venta.hasOwnProperty(sucursal)) {
          const valor = venta[sucursal];
          if (valor > max) {
            max = valor; // Actualiza max si valor es mayor
          }
        }
      }
    });
    return max;
  }
  



}
