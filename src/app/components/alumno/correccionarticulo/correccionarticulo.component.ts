import { ArticulosService } from './../../../servicios/articulos.service';
import { ArticuloModel } from './../../../models/articulo.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correccionarticulo',
  templateUrl: './correccionarticulo.component.html',
  styleUrls: ['./correccionarticulo.component.css']
})
export class CorreccionarticuloComponent implements OnInit {

  @Input()
  ideaItem;

  articulo: ArticuloModel;

  estadoButtons: string;

  constructor(private _articuloService: ArticulosService,
              private router: Router) {
    this.articulo = new ArticuloModel();
    this.articulo.estado = 'SIN_CORRECCIONES';
    this.articulo.ideaId = this.ideaItem;
  }

  ngOnInit() {
    this.validaIdea();  
  }

  validaIdea(){

  }

  crearArticulo(f: NgForm) {
    
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
    this.articulo.ideaId = this.ideaItem;
    this.articulo.idea.id = this.ideaItem;
    this.articulo.estado = 'ENVIADO_POR_CORRECCIONES';
    this.articulo.contenido = '.';
    console.log('Este es el articulo: ', this.articulo);
    this._articuloService.guardarArticulo(this.articulo).subscribe(resp => {
      Swal.close();
      Swal.fire({
        type: 'success',
        text: 'Articulo enviado correctamente',
        title: 'Artículo enviado correctamente'
      }).then( result => {
        if( result.value ){
          this.router.navigateByUrl('/listaIdeas');
        }
      });
    }, catchError =>{
      console.log(catchError);
      Swal.fire({
        type: 'error',
        text: catchError.error.mensaje,
        title: 'Error al intentar guardar un articulo'
      });
    });
  }

}
