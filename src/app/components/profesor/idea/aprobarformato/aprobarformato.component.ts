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
      html:
        '<div class="text-left">'+
        '<legend>Comentario:</legend>'+
        '<textarea class="form-control" id="comentario-rechazo" placeholder="Deja un comentario aquí" ></textarea>'+
        '<legend>Formato con correcciones:</legend>'+
        '<input type="file" class="form-control" id="upload-correcciones" accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .docx" />'+
        '</div>',
      preConfirm: () =>{
        var comentario = (<HTMLInputElement>document.getElementById('comentario-rechazo')).value;
        var documento = (<HTMLInputElement>document.getElementById('upload-correcciones')).files[0];
        if(!comentario){
          Swal.showValidationMessage(
            `Comentario es requerido`
          )
        }
        return {'comentario': comentario, 'documento': documento };
      }   
    }).then((result) => {
      this.enviarInformacion(result);
    });
  }

  async enviarInformacion(resultado:any){
    let comentario = new ComentarioGeneralModel();
    comentario = comentario.of('RECHAZO_FORMATO_IDEA', this.usuarioAut.id, this.idea.id, resultado.value.comentario);    
    if(resultado.value.documento){
      var base =  await this.baseTo64File(resultado.value.documento);
      comentario.base = String(base);
      comentario.tipo_documento = this.identificaTipoDocumento(resultado.value.documento.name);
    }
    this._comentarioServicio.insertarComentario(comentario).subscribe((resp) => {
      this.actualizarEstadoIdea(this.idea.id, 'APROBAR', 'Formato rechazado, El estudiante debe cargar de nuevo el formato.');
    }, (catcherror) => {
      Swal.showValidationMessage('Error al persistir el comentario');
    });
  }

  identificaTipoDocumento(name:string):string{
    var n = name.search("pdf");
    if(n>=0){
      return "pdf";
    }
    n = name.search("docx");
    if(n>=0){
      return "docx";
    }
    return "";
  }

  baseTo64File(file){
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
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