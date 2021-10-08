import { ArticuloModel } from './../../../models/articulo.model';
import { IdeaModel } from './../../../models/idea.model';
import { IdeaService } from 'src/app/servicios/idea.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

enum EstadoIdea {
  IDEA_NUEVA,
  IDEA_ESPERA_APROBACION_TUTOR,
  IDEA_RECHAZADA_TUTOR, 
  IDEA_CARGA_FORMATO,
  IDEA_APROBAR_FORMATO,
  IDEA_FORMATO_RECHAZADO,
  ESPERA_JURADO_COORDINACION,
  IDEA_ESPERA_APROBACION_JURADO,
  IDEA_FORMATO_RECHAZADO_JURADO,
  IDEA_FINALIZADA,
  ARTICULO_EN_CORRECCION_TUTOR,
  ARTICULO_EN_CORRECCION_TUTOR_POR_APROBACION,
  ARTICULO_FORMATO_APROBADO_PARA_PUBLICAR,
  ARTICULO_ESPERA_PUBLICACION_CORDINACION
}

@Component({
  selector: 'app-dibuja-proceso',
  templateUrl: './dibuja-proceso.component.html',
  styleUrls: ['./dibuja-proceso.component.css']
})
export class DibujaProcesoComponent implements OnInit {

  idIdea: number;
  estadoFlujo: EstadoIdea;

  activoColor:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _serviceIdea: IdeaService
  ) {
    this.idIdea = data.idIdea; 
    this.activoColor= "#0FCD71";
   }

  ngOnInit(): void {
    this.buscaIdea();
  }

  buscaIdea(){
    //Validamos el estado de la idea
    if(this.idIdea === -1){
      //Sin Iniciar Idea
      this.estadoFlujo = EstadoIdea.IDEA_NUEVA;
    }else{
      this._serviceIdea.obtenerIdeaById(this.idIdea).subscribe(resp => {
        let ideaModel = new IdeaModel();
        ideaModel = ideaModel.of(resp);
        if(ideaModel.estado === 'CREADA'){
          this.estadoFlujo = EstadoIdea.IDEA_ESPERA_APROBACION_TUTOR;
        }else if(ideaModel.estado === 'RECHAZAR'){
          this.estadoFlujo = EstadoIdea.IDEA_RECHAZADA_TUTOR;
        }else if(ideaModel.estado === 'APROBAR'){
          this.estadoFlujo = EstadoIdea.IDEA_CARGA_FORMATO;
        }else if(ideaModel.estado === 'POR_CONFIRMAR_FORMATO'){
          this.estadoFlujo = EstadoIdea.IDEA_APROBAR_FORMATO;
        }else if(ideaModel.estado === 'RECHAZO_FORMATO'){
          this.estadoFlujo = EstadoIdea.IDEA_FORMATO_RECHAZADO;
        }else if(ideaModel.estado === 'ESPERA_JURADO'){
          this.estadoFlujo = EstadoIdea.ESPERA_JURADO_COORDINACION;
        }else if(ideaModel.estado === 'APROBACION_FORMATO_JURADO'){
          this.estadoFlujo = EstadoIdea.IDEA_ESPERA_APROBACION_JURADO;
        }else if(ideaModel.estado === 'RECHAZADO_JURADO'){
          this.estadoFlujo = EstadoIdea.IDEA_FORMATO_RECHAZADO_JURADO;
        }else if(ideaModel.estado === 'FINALIZADA' || ideaModel.estado === 'ARTICULO_EN_PROCESO'){
          this.estadoFlujo = EstadoIdea.IDEA_FINALIZADA;
          this.buscaArticuloByIdIdea(this.idIdea);
        }
        this.dibujarProceso();         
      });
    }
  }

  buscaArticuloByIdIdea(idIdea: number){
    this._serviceIdea.obtieneIdArtByIdIdea(idIdea).subscribe(resp => {
      if(resp){
        let articulo = new ArticuloModel();
        articulo = articulo.of(resp);
        if(articulo.estado === 'ENVIADO_POR_CORRECCIONES'){
          //envidado por correcciones
          this.estadoFlujo = EstadoIdea.IDEA_FINALIZADA;
        }else if(articulo.estado === 'REVISAR_PROFESOR'){
          this.estadoFlujo = EstadoIdea.ARTICULO_EN_CORRECCION_TUTOR;
        }else if(articulo.estado === 'POR_REVISAR'){
          this.estadoFlujo = EstadoIdea.ARTICULO_EN_CORRECCION_TUTOR_POR_APROBACION;
        }else if(articulo.estado == 'FORMATO_APROBADO_PARA_PUBLICAR'){
          this.estadoFlujo = EstadoIdea.ARTICULO_FORMATO_APROBADO_PARA_PUBLICAR;
        }else if(articulo.estado == 'ESPERA_PUBLICACION_CORDINACION'){
          this.estadoFlujo = EstadoIdea.ARTICULO_ESPERA_PUBLICACION_CORDINACION;
        }
        this.dibujarProceso();
      }
    });
  }


  dibujarProceso(){
    var canvas = <HTMLCanvasElement>document.getElementById('stage');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      
      this.generarCuadroBase(ctx,20,50, "Crear Idea", "Alumno", (this.estadoFlujo === EstadoIdea.IDEA_NUEVA) ? this.activoColor : null);
      this.generarFlecha(ctx, 172,80,25);

      this.generarCuadroBase(ctx,200,50, "Aprobación idea Tutor", "Tutor", (this.estadoFlujo === EstadoIdea.IDEA_ESPERA_APROBACION_TUTOR) ? this.activoColor : null);
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 352,80,25);
      this.generarLineaFraccionadaAbajoIzq(ctx,300,110,70,35);

      
      this.generarCuadroBase(ctx,100,150, "Correccion Idea", "Alumno", (this.estadoFlujo === EstadoIdea.IDEA_RECHAZADA_TUTOR) ? this.activoColor : null);
      this.generarLineaFraccionadaIzqArriba(ctx,100,180,30,62);
      

      this.generarCuadroBase(ctx,380,50, "Cargue Formato","Alumno", (this.estadoFlujo === EstadoIdea.IDEA_CARGA_FORMATO) ? this.activoColor : null);
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 532,80,25);

      this.generarCuadroBase(ctx,560,50, "Aprob. formato tutor", "Tutor", (this.estadoFlujo === EstadoIdea.IDEA_APROBAR_FORMATO) ? this.activoColor : null);
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 712,80,25);
      this.generarLineaFraccionadaAbajoIzq(ctx,650,110,70,35);

      this.generarCuadroBase(ctx,450,150, "Corrección Formato", "Alumno", (this.estadoFlujo === EstadoIdea.IDEA_FORMATO_RECHAZADO) ? this.activoColor : null);
      this.generarLineaFraccionadaIzqArriba(ctx,450,180,30,62);

      this.generarCuadroBase(ctx,740,50, "Asignación Jurado", "Coordinacion", (this.estadoFlujo === EstadoIdea.ESPERA_JURADO_COORDINACION) ? this.activoColor : null );
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 892,80,25);

      this.generarCuadroBase(ctx,920,50, "Aprobación Jurado", "Jurado", (this.estadoFlujo === EstadoIdea.IDEA_ESPERA_APROBACION_JURADO) ? this.activoColor : null );
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx,1072 ,80,25);
      this.generarFlechaAbajo(ctx, 1025, 110, 35);
      this.generarFlechaArriba(ctx,950, 110, 35);

      this.generarCuadroBase(ctx,920,150, "Corrección Formato Jur.", "Alumno", (this.estadoFlujo === EstadoIdea.IDEA_FORMATO_RECHAZADO_JURADO) ? this.activoColor : null );
      this.generarLineaFraccionadaIzqArriba(ctx,450,180,30,62);


      this.generarCuadroBase(ctx,1100,50, "Creación Articulo", "Alumno",(this.estadoFlujo === EstadoIdea.IDEA_FINALIZADA) ? this.activoColor : null );
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 1252,80,25);

      this.generarCuadroBase(ctx,1280,50, "Aprobación Articulo", "Tutor", (this.estadoFlujo === EstadoIdea.ARTICULO_EN_CORRECCION_TUTOR) ? this.activoColor : null  );
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 1432,80,25);

      this.generarCuadroBase(ctx,1460,50, "Revisión Formato", "Tutor", (this.estadoFlujo === EstadoIdea.ARTICULO_EN_CORRECCION_TUTOR_POR_APROBACION) ? this.activoColor : null  );
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 1612,80,25);
      
      this.generarCuadroBase(ctx,1640,50, "Subir Carta Publicación", "Alumno", (this.estadoFlujo === EstadoIdea.ARTICULO_FORMATO_APROBADO_PARA_PUBLICAR) ? this.activoColor : null  );
      //sumo 152 pixeles al eje x
      this.generarFlecha(ctx, 1792,80,25);

      
      this.generarCuadroBase(ctx,1820,50, "Publicación", "Coordinación", (this.estadoFlujo === EstadoIdea.ARTICULO_ESPERA_PUBLICACION_CORDINACION) ? this.activoColor : null);
      //sumo 152 pixeles al eje x
      //this.generarFlecha(ctx, 1612,80,25);

      //this.generarCirculo(ctx,1700, 80, 'Publicado por el Tutor', );
    }
  }

  generarCuadroBase(ctx, x:number, y:number, texto: string, actor?:string, color?: string){
    if(color){
      ctx.fillStyle = color;  
    }else{
      ctx.fillStyle = "#CCCCCC";
    }
    ctx.fillRect(x, y, 150, 60);
    ctx.strokeRect(x, y, 150, 60);
    ctx.fillStyle = "black";
    ctx.font="bold 12px arial";
    ctx.fillText(texto , x + 10 , y+30);
    //
    if(actor){
      ctx.fillText("("+actor+")" , x + 10 , y+45);
    }
  }

  generarFlecha(ctx, x:number, y:number, longitud: number){
    //Linea principal
    ctx.moveTo(x,y);
    ctx.lineTo(x+longitud,y);    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    //Linea superior de la flecha
    ctx.moveTo(x+longitud-8,y+5);
    ctx.lineTo(x+longitud,y);    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.moveTo(x+longitud-8,y-5);
    ctx.lineTo(x+longitud,y);    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }

  generarCirculo(ctx, x:number, y:number, mensaje: string){
    ctx.moveTo(x,y);
    ctx.arc(x,y,10,0,(Math.PI/180)*360,true);    
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font="bold 12px arial";
    ctx.fillText(mensaje , x - 20 , y+30);
  }

  generarLineaFraccionadaAbajoIzq(ctx, x:number, y:number, longitudAbajo:number, longitudIzq:number){
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+longitudAbajo);
    ctx.moveTo(x,y+longitudAbajo);
    ctx.lineTo(x-longitudIzq, y+longitudAbajo)
    let xFinal: number = x-longitudIzq ; 
    let yFinal: number = y+longitudAbajo ; 
    ctx.moveTo(xFinal,yFinal);
    ctx.lineTo(xFinal+8,yFinal-5);
    ctx.lineTo(xFinal+8,yFinal+5);

  }

  generarLineaFraccionadaIzqArriba(ctx, x:number, y:number, longitudIzq:number, longitudArriba:number){
    ctx.moveTo(x,y);
    ctx.lineTo(x-longitudIzq,y);
    ctx.moveTo(x-longitudIzq,y);
    ctx.lineTo(x-longitudIzq, y-longitudArriba)
    let xFinal: number = x-longitudIzq ; 
    let yFinal: number = y-longitudArriba ; 
    ctx.moveTo(xFinal,yFinal);
    ctx.lineTo(xFinal-5,yFinal+8);
    ctx.lineTo(xFinal+5,yFinal+8);
  }

  generarFlechaAbajo(ctx, x:number, y:number, longitud: number){
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+longitud);
    let xFinal: number = x ; 
    let yFinal: number = y+longitud ; 
    ctx.moveTo(xFinal,yFinal);
    ctx.lineTo(xFinal+5,yFinal-8);
    ctx.lineTo(xFinal-5,yFinal-8);
  }

  generarFlechaArriba(ctx, x:number, y:number, longitud: number){
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+longitud);
    let xFinal: number = x ; 
    let yFinal: number = y ; 
    ctx.moveTo(xFinal,yFinal);
    ctx.lineTo(xFinal+5,yFinal+8);
    ctx.lineTo(xFinal-5,yFinal+8);
  }
   
}
