import { ParrafoModel } from './../../../models/parrafo.model';
import { ParrafoService } from './../../../servicios/parrafo.service';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-previa-articulo',
  templateUrl: './vista-previa-articulo.component.html',
  styleUrls: ['./vista-previa-articulo.component.css']
})
export class VistaPreviaArticuloComponent implements OnInit {

  @Input()
  idArticulo: number;
  @Input()
  alumno:boolean;

  articulo: ArticuloModel;
  parrafos: ParrafoModel[];

  constructor(private _articuloService: ArticulosService,
              private _parrafoService: ParrafoService) {
    this.articulo = new ArticuloModel();
   }

  ngOnInit(): void {
    this.buscaArticulo();
    this.buscarParrafos();
  }

  buscaArticulo(){
    this._articuloService.consultaArticuloById(this.idArticulo).subscribe(resp => {
      if(resp){
        let art = new ArticuloModel();
        this.articulo = art.of(resp);
      }
    });
  }

  buscarParrafos(){
    this._parrafoService.getParrafosByArtId(this.idArticulo).subscribe(resp => {
      if(resp){
        console.log('Estos son los parrafos: ', resp)
        this.parrafos = resp;
      }
    });

  }

}
