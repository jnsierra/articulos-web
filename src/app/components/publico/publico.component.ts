import { EstadisticaArticuloModel } from './../../models/estadisticasarticulo.model';
import { EstadisticasService } from './../../servicios/estadisticas.service';
import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styles: []
})
export class PublicoComponent {
   // Pie
   pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
      align: 'start'
    }
  };
  pieChartLabels: Label[];
  pieChartData: number[];
  pieChartType: ChartType = 'pie';
  pieChartLegend = false;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.8)', 
                        'rgba(0,255,30,1)', 
                        'rgba(0,0,255,0.8)', 
                        'rgba(21,100,51,0.8)', 
                        'rgba(5,230,255,0.8)', 
                        'rgba(150,20,255,0.8)', 
                        'rgba(40,30,100,0.8)', 
                        'rgba(80,255,0,0.8)'
                      ],
    },
  ];


  pieChartLabelsArt: Label[];
  pieChartDataArt: number[];

  constructor(private _estadisticasServices: EstadisticasService) {
    //TODO Volver a hacer las estadisticas
    this.getEstadisticasByIdeas();
    this.getEstadisticasByArticulo();
    this.pieChartData = new Array();
    this.pieChartLabels = new Array();

    this.pieChartDataArt = new Array();
    this.pieChartLabelsArt = new Array();
  }

  getEstadisticasByArticulo(){
    this._estadisticasServices.getEstadisticaArticulosByEstado().subscribe(resp => {
      resp.forEach(item =>{
        console.log("item: " , item);
        if(item.estado == "POR_REVISAR"){
          this.pieChartDataArt.push(item.conteo);
          this.pieChartLabelsArt.push('ARTICULO EN REVISIÓN');
        }
        if(item.estado == "ENVIADO_POR_CORRECCIONES"){
          this.pieChartDataArt.push(item.conteo);
          this.pieChartLabelsArt.push('ARTICULO INICIADO POR EL ESTUDIANTE');
        }
        if(item.estado == "REVISAR_PROFESOR"){
          this.pieChartDataArt.push(item.conteo);
          this.pieChartLabelsArt.push('ARTICULO EN REVISIÓN POR EL TUTOR');
        }
        if(item.estado == "ARTICULO_APROBADO"){
          this.pieChartDataArt.push(item.conteo);
          this.pieChartLabelsArt.push('ARTICULO CORREGIDO POR EL TUTOR, PARA GENERAR DOCUMENTO');
        }
      });
      console.log( resp );
    });
  }

  getEstadisticasByIdeas(){
    this._estadisticasServices.getEstadisticaIdeaByEstado().subscribe(resp => {
      //obtenemos los valores estadisticos
      resp.forEach(item => {
        if(item.estado === 'CREADA'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('CREADA');
        }
        if(item.estado === 'APROBAR'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('POR CARGAR FORMATO');
        }
        if(item.estado === 'APROBACION_FORMATO_JURADO'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('FORMATO POR APROBACIÓN JURADO');
        }
        if(item.estado === 'RECHAZO_FORMATO'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('RECHAZO FORMATO POR TUTOR');
        }
        if(item.estado === 'POR_CONFIRMAR_FORMATO'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('ESPERA APROBACIÓN FORMATO TUTOR');
        }
        if(item.estado === 'ESPERA_JURADO'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('ESPERA ASIGNACION JURADO');
        }
        if(item.estado === 'ARTICULO_EN_PROCESO'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('IDEA EN PROCESO DE ARTICULO');
        }
        if(item.estado === 'RECHAZAR'){
          this.pieChartData.push(item.conteo);
          this.pieChartLabels.push('IDEA RECHAZADA POR EL TUTOR');
        }
      })
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}