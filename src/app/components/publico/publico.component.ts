import { EstadisticaArticuloModel } from './../../models/estadisticasarticulo.model';
import { EstadisticaModel } from './../../models/estadisticaidea.model';
import { EstadisticasService } from './../../servicios/estadisticas.service';
import { Component, OnInit } from '@angular/core';
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
      position: 'top'
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[];
  pieChartData: number[];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  pieChartLabelsArt: Label[];
  pieChartDataArt: number[];

  constructor(private _estadisticasServices: EstadisticasService) {
    this.getEstadisticasByIdeas();
    this.getEstadisticasByArticulo();
    this.pieChartData = new Array();
    this.pieChartLabels = new Array();

    this.pieChartDataArt = new Array();
    this.pieChartLabelsArt = new Array();
  }

  getEstadisticasByArticulo(){
    this._estadisticasServices.getEstadisticaArticulosByEstado().subscribe(resp => {
      let estaArt = new EstadisticaArticuloModel();
      estaArt = estaArt.of( resp );
      if(estaArt.ENVIADO_POR_CORRECCIONES){
        this.pieChartDataArt.push(estaArt.ENVIADO_POR_CORRECCIONES);
        this.pieChartLabelsArt.push('ENVIADO A PROFESOR PARA CORREGIR');
      }
      if(estaArt.PUBLICADO){
        this.pieChartDataArt.push(estaArt.PUBLICADO);
        this.pieChartLabelsArt.push('PUBLICADOS');
      }
      console.log( estaArt );
    });
  }

  getEstadisticasByIdeas(){
    this._estadisticasServices.getEstadisticaIdeaByEstado().subscribe(resp => {
      //obtenemos los valores estadisticos
      let estadistica = new EstadisticaModel();
      estadistica = estadistica.of(resp);
      if(estadistica.CREADA){
        this.pieChartData.push(estadistica.CREADA);
        this.pieChartLabels.push('CREADAS');
      }

      if(estadistica.APROBAR){
        this.pieChartData.push(estadistica.APROBAR);
        this.pieChartLabels.push('APROBADAS');
      }

      if(estadistica.RECHAZAR){
        this.pieChartData.push(estadistica.RECHAZAR);
        this.pieChartLabels.push('RECHAZADAS');
      }
      console.log(estadistica);
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