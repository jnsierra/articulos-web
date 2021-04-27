import { ControlLecturaModel } from './../../../models/controllectura.model';
import { ControlLecturaService } from './../../../servicios/controllectura.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-control-lectura',
  templateUrl: './ver-control-lectura.component.html',
  styleUrls: ['./ver-control-lectura.component.css']
})
export class VerControlLecturaComponent implements OnInit {

  @Input()
  idArticulo:number;
  @Input()
  titulo: string;

  listControlLectura:ControlLecturaModel[];

  constructor(private _controlLecturaService: ControlLecturaService) { }

  ngOnInit(): void {
    this.buscarControlesLectura();
  }

  buscarControlesLectura(){
    this._controlLecturaService.getControlesLecturaByArticulo(this.idArticulo).subscribe(resp => {
      this.listControlLectura = resp;
    });
  }

}
