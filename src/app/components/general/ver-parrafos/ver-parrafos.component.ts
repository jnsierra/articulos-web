import { ParrafoModel } from './../../../models/parrafo.model';
import { ParrafoService } from './../../../servicios/parrafo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  listaParrafos: ParrafoModel[];

  constructor(private _parrafoService: ParrafoService) {
    this.parrafoSeleccionado = new EventEmitter();
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

}
