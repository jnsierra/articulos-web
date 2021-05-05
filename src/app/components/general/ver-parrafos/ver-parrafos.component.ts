import { ParrafoModel } from './../../../models/parrafo.model';
import { ParrafoService } from './../../../servicios/parrafo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ver-parrafos',
  templateUrl: './ver-parrafos.component.html',
  styleUrls: ['./ver-parrafos.component.css']
})
export class VerParrafosComponent implements OnInit {

  @Input()
  idArticulo: number;
  @Input()
  titulo: string;
  @Input()
  muestraUpdate: boolean;

  @Output()
  parrafoSeleccionado: EventEmitter<ParrafoModel>;

  @Output()
  parrafoEliminado: EventEmitter<ParrafoModel>;

  listaParrafos: ParrafoModel[];

  constructor(private _parrafoService: ParrafoService) {
    this.parrafoSeleccionado = new EventEmitter();
    this.parrafoEliminado = new EventEmitter();
    this.buscarParrafos();

   }

  ngOnInit(): void {
    this.buscarParrafos();
  }

  buscarParrafos(){
    if(this.idArticulo){
      this._parrafoService.getParrafosByArtId(this.idArticulo).subscribe(resp => {
        this.listaParrafos = resp;
      });
    }
    
  }

  editarParrafo(item: ParrafoModel){
    this.parrafoSeleccionado.emit(item);
  }

  eliminarItem(item: ParrafoModel){
    this.parrafoEliminado.emit(item);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listaParrafos, event.previousIndex, event.currentIndex);
    this.persistirOrden();
  }

  persistirOrden(){
    for(let i = 0 ; i < this.listaParrafos.length; i++){
      this._parrafoService.updateOrden(this.listaParrafos[i].id, i+1).subscribe(resp => {
        console.log(resp);
      });
    }
  }

}
