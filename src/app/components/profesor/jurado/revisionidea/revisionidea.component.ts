import { FormatoIdeaService } from './../../../../servicios/formatoIdea.service';
import { UploadFormatoIdea } from './../../../../models/uploadformatoidea.model';
import { IdeaService } from 'src/app/servicios/idea.service';
import { ComentarioGeneralService } from './../../../../servicios/comentariogeneral.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ComentarioGeneralModel } from './../../../../models/comentariogeneral.model';
import { UtilesBase64Service } from './../../../../servicios/utilesBase64.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revisionidea',
  templateUrl: './revisionidea.component.html',
  styleUrls: ['./revisionidea.component.css']
})
export class RevisionideaComponent implements OnInit {

  idIdea: number;
  usuarioAut: UsuarioModel;

  constructor(private activatedRoute: ActivatedRoute,
              private _comentarioServicio: ComentarioGeneralService,
              private _ideaService: IdeaService,
              private router: Router,
              private _formatoIdeaService: FormatoIdeaService,
              private _utilesBase64:UtilesBase64Service) {
    this.usuarioAut = JSON.parse(localStorage.getItem('usuario'));
    this.activatedRoute.params.subscribe(params => {
      this.idIdea = Number(params['id']);
    });
   }

  ngOnInit(): void {
  }
  
  rechazarDocumento(id: number) {
    const accepts = 'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .docx';
    const html = `<div class="text-left">
                    <legend>Comentario:</legend>
                    <textarea class="form-control" id="comentario-rechazo" placeholder="Deja un comentario aquí" ></textarea>
                    ${this._utilesBase64.generateInputFile('Formato con correcciones:','upload-correcciones', accepts )}
                  </div>`;
    Swal.fire({
      allowOutsideClick: false,
      title: 'DOCUMENTO RECHAZADO',
      type: 'error',
      text: 'Por favor digite el comentario de rechazo del documento:',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      html: html,
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
      if(result.value){
        this.enviarInformacion(result, 'RECHAZO_FORMATO_IDEA_JURADO');
      }
    });
  }

  async enviarInformacion(resultado:any, tipoComentario: string){
    let comentario = new ComentarioGeneralModel();
    comentario = comentario.of(tipoComentario, this.usuarioAut.id, this.idIdea, resultado.value.comentario);    
    if(resultado.value.documento){
      var base =  await this._utilesBase64.baseTo64File(resultado.value.documento);
      comentario.base = String(base);
      comentario.tipo_documento = this._utilesBase64.identificaTipoDocumento(resultado.value.documento.name);
    }
    this._comentarioServicio.insertarComentario(comentario).subscribe((resp) => {
      this.actualizarEstadoIdea(this.idIdea, 'RECHAZADO_JURADO', 'Formato rechazado, El estudiante debe cargar de nuevo el formato.');
    }, (catcherror) => {
      Swal.showValidationMessage('Error al persistir el comentario');
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
    this._ideaService.actualizarEstadoIdea(idIdea, estado, this.usuarioAut.id).subscribe(resp => {
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

  aprobarDocumento(idIdea:number){
    const accepts = 'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .docx';
    const html = `<div class="text-left">${this._utilesBase64.generateInputFile('Formato Firmado:','upload-formato-firmado', accepts )}</div>`;
    Swal.fire({
      allowOutsideClick: false,
      title: 'DOCUMENTO APROBADO',
      type: 'success',
      text: 'Adjunta documento firmado.',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      html: html,
      preConfirm: () =>{
        var documento = (<HTMLInputElement>document.getElementById('upload-formato-firmado')).files[0];
        if(!documento){
          Swal.showValidationMessage(
            `Adjunto es requerido`
          )
        }
        return {'comentario': 'APROBADO', 'documento': documento };
      }   
    }).then((result) => {
      this.enviarInformacionAprobado(result, 'FORMATO_APROBADO_JURADO');
    });

  }

  async enviarInformacionAprobado(resultado:any, tipoComentario: string){
    let uploadFormatoIdea = new UploadFormatoIdea();
    var base =  await this._utilesBase64.baseTo64File(resultado.value.documento);
    uploadFormatoIdea.base64 = String(base);
    uploadFormatoIdea.idIdea = this.idIdea;
    uploadFormatoIdea.formato = tipoComentario;
    uploadFormatoIdea.tipo = this._utilesBase64.identificaTipoDocumento(resultado.value.documento.name);

    this._formatoIdeaService.insertaFormatoIdea(uploadFormatoIdea).subscribe(resp => {
      if(resp){
        this.actualizarEstadoIdea(this.idIdea, 'FINALIZADA', 'Documento aprobado correctamente.');
        Swal.fire({
          allowOutsideClick: false,
          type: "success",
          text: "Formato cargado correctamente"
        }).then( (result) => {
          if(result){
            this.router.navigateByUrl('/listaIdeasProf');
          }
        });
      }else{
        Swal.fire({
          allowOutsideClick: false,
          type: "error",
          text: "Error al cargar el formato, contacte al administrador"
        }).then( (result) => {
          if(result){
            this.router.navigateByUrl('/listaIdeasProf');
          }
        });
      }
    });
  }

}
