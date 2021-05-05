import { VerParrafosComponent } from './../../../general/ver-parrafos/ver-parrafos.component';
import { ParrafoService } from './../../../../servicios/parrafo.service';
import { ParrafoModel } from './../../../../models/parrafo.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-parrafos',
  templateUrl: './gestion-parrafos.component.html',
  styleUrls: ['./gestion-parrafos.component.css']
})
export class GestionParrafosComponent implements OnInit {

  idArticulo: number;
  parrafo:ParrafoModel;
  listaOrden: number[] = [1,2,3,4,5,6,7,8,9,10];
  @ViewChild(VerParrafosComponent)
  verParrafosComponent: VerParrafosComponent;

  constructor(private activatedRoute: ActivatedRoute
            , private _parrafoService: ParrafoService) {
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      this.reiniciarObj();
    });
  }

  ngOnInit(): void {
  }

  submitForm(f: NgForm){
    if(f.invalid){
      return ; 
    }
    if(this.parrafo.id){
      this.modificarParrafo();
    }else{
      this.crearParrafo();
    }
  }

  reiniciarObj(){
    this.parrafo = new ParrafoModel(); 
    this.parrafo.orden = 1;
    this.parrafo.idArticulo = this.idArticulo;
    this.parrafo.estado = 'POR_REVISAR_PROFESOR';
  }

  crearParrafo(){
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._parrafoService.guardarParrafo(this.parrafo).subscribe(resp =>{
      this.reiniciarObj();
      this.verParrafosComponent.buscarParrafos();
      Swal.fire({
        allowOutsideClick: false,
        type: 'success',
        text: 'Parrafo asociado correctamente'
      });
    });
  }

  modificarParrafo(){
    this.parrafo.estado = 'CORREGIDO_PARA_REVISION';
    this.crearParrafo();
  }

  nonSubmited(){
    if(this.parrafo['orden']){
      return false;
    }
  }

  editar(item: ParrafoModel){
    this.parrafo = item;
  }

  eliminarItem(item: ParrafoModel){
    //this.parrafo = item;
    //this.parrafo.estado = 'ELIMINADO';
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: '¿Desea eliminar el párrafo? Esta acción no se puede reversar en un futuro.',
      title: 'Confirmacion', 
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        this.parrafo = item;
        this.parrafo.estado = 'ELIMINADO';
        this.crearParrafo(); 
      }
    });
  }

}
