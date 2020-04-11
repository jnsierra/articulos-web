import { ComentarioModel } from './../../../models/comentario.model';
import { ComentariosService } from './../../../servicios/comentarios.service';
import { ArticuloModel } from './../../../models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autorizararticulo',
  templateUrl: './autorizararticulo.component.html',
  styles: []
})
export class AutorizararticuloComponent implements OnInit {

  idArticulo: number;
  articulo: ArticuloModel;
  articulosHis: ArticuloModel[];
  comentarios: ComentarioModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private _articuloService: ArticulosService,
              private _comentarioService: ComentariosService,
              private router: Router) {
    this.articulo = new ArticuloModel();
    this.comentarios = new Array();
    this.articulosHis = new Array();
    this.activatedRoute.params.subscribe(params => {
      this.idArticulo = Number(params['id']);
      this.buscaArticuloById(this.idArticulo);
    });
  }

  ngOnInit() {
  }

  buscaArticuloById(idArt: number) {
    this._articuloService.consultaArticuloById(idArt).subscribe(resp => {
      this.articulo = this.articulo.of(resp);
    });
  }

  aprobarArticulo() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._articuloService.actualizarEstadoArticulo(this.articulo.id, 'APROBADO').subscribe(resp => {
      if (resp) {
        Swal.close();
        Swal.fire({
          type: 'success',
          text: 'Articulo aprobado correctamente',
          title: 'Artículo enviado correctamente'
        }).then(result => {
          if (result.value) {
            this.buscaArticuloById(this.idArticulo);
          }
        });
      } else {
        Swal.fire({
          type: 'error',
          text: 'Error al intentar aprobar un artículo',
          title: 'Error articulo'
        });
      }
    }, catchError =>{
      Swal.fire({
        type: 'error',
        text: catchError.error.mensaje,
        title: 'Error al intentar aprobar un articulo'
      });
    });
  }

  rechazarArticulo(){
    Swal.fire({
      type: 'error',
      title: 'Rechazar Articulo',
      text: 'Por Favor digite algún comentario para este artículo',
      input: 'text',
      showCancelButton: true
    }).then( result => {
      if( result.value ){
        this.generarRechazoArticulo(result.value);
      }
    });
  }

  generarRechazoArticulo(comentarioArt: string){
    let comentario = new ComentarioModel();
    comentario = comentario.of(comentarioArt, this.idArticulo);
    this._comentarioService.insertarComentarioByArticulo(comentario).subscribe(resp => {
      this.router.navigateByUrl('/listaIdeasProf');
    });
  }

  obtieneHistorialArticulos(){
    this._articuloService.consultarHistArtById( this.articulo.idea.id ).subscribe(resp => {
      let aux = new ArticuloModel();
      this.articulosHis = aux.ofListView(resp);
    });
  }

  obtieneComentariosProfArt() {
    console.log( this.articulo.idea.id );
    this._comentarioService.consultaComentariosByIdArticulo( this.articulo.idea.id )
      .subscribe(resp => {
        let comentarioAux = new ComentarioModel();
        this.comentarios = comentarioAux.ofList(resp);
      });
  }
}
