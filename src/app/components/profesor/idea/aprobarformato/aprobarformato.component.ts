import { DownloadService } from './../../../../servicios/download.service';
import { UsuarioModel } from './../../../../models/usuario.model';
import { ComentarioGeneralModel } from './../../../../models/comentariogeneral.model';
import { ComentarioGeneralService } from './../../../../servicios/comentariogeneral.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { IdeaModel } from './../../../../models/idea.model';
import { IdeaService } from './../../../../servicios/idea.service';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobarformato',
  templateUrl: './aprobarformato.component.html',
  styleUrls: []
})
export class AprobarformatoComponent implements OnInit {

  idIdea: number;
  idea: IdeaModel;
  profesores;
  comentarioGeneral: ComentarioGeneralModel[];
  verPdf: boolean;
  usuarioAut: UsuarioModel;

  constructor(private activatedRoute: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _comentarioGeneralService: ComentarioGeneralService,
    private _downloadService: DownloadService,
    private _comentarioServicio: ComentarioGeneralService,
    private _ideaServicio: IdeaService,
    private _ideaService: IdeaService,
    private router: Router) {
    this.usuarioAut = JSON.parse(localStorage.getItem('usuario'));
    this.activatedRoute.params.subscribe(params => {
      this.idIdea = Number(params['id']);
      this.buscaIdeaById();
      this.buscarComentariosRechazo();
    });
  }

  ngOnInit(): void {
    this.idea = new IdeaModel();
    this.verPdf = false;
  }

  buscaIdeaById() {
    this._ideaService.obtenerIdeaById(this.idIdea).subscribe(resp => {
      this.idea = this.idea.ofWithIdProf(resp);
    });
  }

  buscarComentariosRechazo() {
    this._comentarioGeneralService.consultaComentariosByLlaveAndType(this.idIdea, 'RECHAZO_IDEA').subscribe(resp => {
      this.comentarioGeneral = resp;
      if (this.comentarioGeneral) {
        //Buscamos el nombre del profesor
        this.comentarioGeneral.forEach(item => {
          this._usuarioService.obtenerUsuariosById(item.id_usuario).subscribe(resp => {
            let usuario = new UsuarioModel();
            usuario = usuario.of(resp);
            item.nombreProfesor = usuario.nombre;
          });
        });
      }
    });
  }

  descargarFormato() {
    this._downloadService.getFormatoIdeaFirmado(this.idIdea).subscribe((resp) => {
      this.downloadPdf(resp.document, resp.nombre);
    });
  }

  downloadPdf(base64String, fileName) {
    this.verPdf = true;
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}`;
    link.click();
  }

  aprobarDocumento(id: number) {
    if(this.verPdf){
      this.actualizarEstadoIdea(this.idea.id, 'FINALIZADA', 'Documento aprobado correctamente.');
    }else{
      Swal.fire({
        type: 'error',
        title: 'VER DOCUMENTO',
        text: 'Debes ver el pdf previo a la aprobación del documento'
      });
    }
  }

  rechazarDocumento(id: number) {
    Swal.fire({
      allowOutsideClick: false,
      title: 'DOCUMENTO RECHAZADO',
      type: 'error',
      text: 'Por favor digite el comentario de rechazo del documento:',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      input: 'textarea',
      preConfirm: (mensaje) => {
        let comentario = new ComentarioGeneralModel();
        comentario = comentario.of('RECHAZO_FORMATO_IDEA', this.usuarioAut.id, this.idea.id, mensaje);
        this._comentarioServicio.insertarComentario(comentario).subscribe((resp) => {
          return true;
        }, (catcherror) => {
          Swal.showValidationMessage('Error al persistir el comentario');
        });

      }
    }).then((result) => {
      this.actualizarEstadoIdea(this.idea.id, 'APROBAR', 'Formato rechazado, El estudiante debe cargar de nuevo el formato.');
    });
  }

  actualizarEstadoIdea(idIdea: number, estado: string, mensaje: string) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._ideaServicio.actualizarEstadoIdea(idIdea, estado, this.usuarioAut.id).subscribe(resp => {
      if (resp) {
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: mensaje,
          title: 'Idea actualizada'
        }).then((result) => {
          this.router.navigateByUrl('/listaIdeasProf');
        });
      } else {
        Swal.fire({
          type: 'error',
          text: 'Error al rechazar el formato, por favor intente mas tarde.',
          title: 'Error Idea'
        });
      }
    });
  }
}