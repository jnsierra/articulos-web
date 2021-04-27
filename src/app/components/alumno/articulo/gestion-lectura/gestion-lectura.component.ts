import { VerControlLecturaComponent } from './../../../general/ver-control-lectura/ver-control-lectura.component';
import { ControlLecturaService } from './../../../../servicios/controllectura.service';
import { ControlLecturaModel } from './../../../../models/controllectura.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-lectura',
  templateUrl: './gestion-lectura.component.html',
  styleUrls: ['./gestion-lectura.component.css']
})
export class GestionLecturaComponent implements OnInit {

  idArticulo: number;
  controlLectura: ControlLecturaModel;
  listAnios: number[] = [2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011];
  listCalificacion: number[] = [1,2,3,4,5];
  @ViewChild(VerControlLecturaComponent)
  listaControlesLectura: VerControlLecturaComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private _controlLecturaService: ControlLecturaService) { 
    this.controlLectura = new ControlLecturaModel();
    this.controlLectura.year = 2021;
    this.controlLectura.calificacion = 1;
    this.controlLectura.orden = 1;
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      this.controlLectura.idArticulo = this.idArticulo;
    });
  }

  ngOnInit(): void {
  }

  actualizaControl(f:NgForm){
    if( f.invalid ){
      return ;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.controlLectura.estado = 'CREADA';
    this._controlLecturaService.insertarControlLectura(this.controlLectura).subscribe(resp => {
      this.listaControlesLectura.buscarControlesLectura();
      Swal.fire({
        allowOutsideClick: false,
        type: 'success',
        text: 'Control de lectura asociado correctamente'
      });
    });

  }

  nonSubmited(  ){
    if(this.controlLectura['year']){
      return false;
    }
    if(this.controlLectura['calificacion']){
      return false;
    }
    return true;
  }

}