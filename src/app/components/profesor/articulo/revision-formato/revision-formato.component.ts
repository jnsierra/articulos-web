import { UsuarioModel } from './../../../../models/usuario.model';
import { ComentarioFormatoArticuloModel } from './../../../../models/comentarioformatoarticulo.model';
import { RechazarFormatoArticuloComponent } from './../../../dialog/rechazar-formato-articulo/rechazar-formato-articulo.component';
import { ComentarioFormatoArticuloService } from './../../../../servicios/comentarioformatoarticulo.service';
import { FormatoModel } from './../../../../models/formato.model';
import { FormatoService } from './../../../../servicios/formato.service';
import { UtilesBase64Service } from './../../../../servicios/utilesBase64.service';
import { DownloadService } from './../../../../servicios/download.service';
import { DocumentDownload } from './../../../../models/DocumentDownload.model';
import { ArticuloModel } from './../../../../models/articulo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-revision-formato',
  templateUrl: './revision-formato.component.html',
  styleUrls: ['./revision-formato.component.css']
})
export class RevisionFormatoComponent implements OnInit {

  idArticulo: number;
  articulo: ArticuloModel;
  formatos: FormatoModel[];
  usuarioAut: UsuarioModel;

  constructor(private activatedRoute: ActivatedRoute,
    private _articulosService: ArticulosService,
    private _utilesBase64Service: UtilesBase64Service,
    private _formatoService: FormatoService,
    private _comentarioFormatoArticuloService: ComentarioFormatoArticuloService,
    private _downloadService: DownloadService, 
    private _articuloService: ArticulosService,
    private router: Router, 
    private _dialogRechazo: MatDialog) {
    this.usuarioAut = JSON.parse(localStorage.getItem('usuario'));
    this.articulo = new ArticuloModel();
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      this.buscaArticulo();
      this.consultaFormatos();
    });
   }

  ngOnInit(): void {
  }

  buscaArticulo(){
    this._articulosService.consultaArticuloById(this.idArticulo).subscribe(resp => {
      if(resp){
        this.articulo = this.articulo.of(resp);
      }
    });
  }

  descargarFormato(){
    let documento = new DocumentDownload();
    if(this.formatos && this.formatos.length > 0 ){
      documento.ubicacion = this.formatos[0].ubicacion;
      this._downloadService.getDocumentByUbicacion(documento).subscribe(resp => {
        this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
      });
    }
  }

  consultaFormatos(){
    this._formatoService.consultarFormatoArticulos(this.idArticulo).subscribe(resp => {
      if(resp && resp.length > 0){
        this.formatos = resp;
        this.buscarComentarios();
      }else{
        Swal.fire(
          'Sin Informacion',
          'No existen formatos por revisar por favor contacte al administrador',
          'error'
        );
      }
    });
  }

  descargarHistorico(ubicacion: string){
    let documento = new DocumentDownload();
    documento.ubicacion = ubicacion;
    this._downloadService.getDocumentByUbicacion(documento).subscribe(resp => {
      this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
    });
  }

  buscarComentarios(){
    this.formatos.forEach(item => {
      this._comentarioFormatoArticuloService.consultaComentariosByFormato(item.id).subscribe(resp => {
        item.comentarios = resp;
      });      
    }) 
  }

  rechazarFormato(){
    const dialogRef = this._dialogRechazo.open(RechazarFormatoArticuloComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rechazarFormatoServicio(result);
    });
  }

  rechazarFormatoServicio(comentario:string){
    console.log('Este es el comentario desde la funcion: ', comentario);
    let comentarioObj = new ComentarioFormatoArticuloModel();
    comentarioObj.tipoComentario = "RECHAZO";
    comentarioObj.idUsuario = this.usuarioAut.id;
    comentarioObj.comentario = comentario;
    comentarioObj.ubicacion = this.formatos[0].ubicacion;
    comentarioObj.idFormato = this.formatos[0].id;
    this._comentarioFormatoArticuloService.insertarComentario(comentarioObj).subscribe(resp => {
      if(resp && resp.id){
        //Cambiamos el estado del articulo
        this._articuloService.actualizarEstadoArticulo(this.formatos[0].idArticulo, "FORMATO_RECHAZADO_CON_COMENTARIO").subscribe(resp => {
          if(resp){
            Swal.fire({
              allowOutsideClick: false,
              type: 'success',
              text: 'Formato enviado a corrección correctamente.'
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/listaIdeasProf');
              }
            });
          }
        })
      }
    });
  }

  aprobarArticulo(){
    this._articuloService.actualizarEstadoArticulo(this.formatos[0].idArticulo, "FORMATO_APROBADO_PARA_PUBLICAR").subscribe(resp => {
      if(resp){
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: 'Formato listo para publicar en revista.'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/listaIdeasProf');
          }
        });
      }
    })

  }

}