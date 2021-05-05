import { Router } from '@angular/router';
import { UsuarioModel } from './../../../models/usuario.model';
import { ComentarioGeneralService } from './../../../servicios/comentariogeneral.service';
import { ComentarioGeneralModel } from './../../../models/comentariogeneral.model';
import { ComentariosService } from './../../../servicios/comentarios.service';
import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/servicios/idea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaideas',
  templateUrl: './listaideas.component.html',
  styles: []
})
export class ListaideasProfComponent implements OnInit {

  ideas;
  usuario;
  ideasEnEspera;
  ideasJurado;
  usuarioAut: UsuarioModel;

  constructor(private _ideaServicio: IdeaService, 
              private _comentarioServicio: ComentarioGeneralService,
              private router: Router) {
    this.buscarIdeasProfesor();
    this.usuarioAut =  JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit() {
  }

  buscarIdeasProfesor() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    /*this._ideaServicio.consultarIdeasProfesorByEstado(this.usuario.id, 'CREADA').subscribe(resp => {
      this.ideas = resp;
    });
    this._ideaServicio.consultarIdeasProfesorByEstado(this.usuario.id, 'POR_CONFIRMAR_FORMATO').subscribe(resp => {
      this.ideasEnEspera = resp;
    });*/
    this._ideaServicio.consultarIdeasProfesorByEstadoAndTypeProfesor(this.usuario.id, 'APROBACION_FORMATO_JURADO','JURADO').subscribe(resp => {
      this.ideasJurado = resp;
    });
  }

  actualizarEstadoIdea(idIdea: number, estado: string) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._ideaServicio.actualizarEstadoIdea(idIdea, estado, this.usuario.id).subscribe(resp => {
      if (resp) {
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: 'Idea actualizada correctamente. Su estudiante ya puede subir la informacion del articulo',
          title: 'Idea actualizada'
        }).then((result) => {
          if (result.value) {
            this.buscarIdeasProfesor();
          }
        });
      } else {
        Swal.fire({
          type: 'error',
          text: 'Error al actualizar la idea',
          title: 'Error Idea'
        });
      }
      console.log(resp);
    });
  }

  capturaComentarioRechazo(idIdea: number, estado: string){
    Swal.fire({
      allowOutsideClick: false,
      title: 'IDEA RECHAZADA',
      type: 'error',
      text: 'Por favor digite el comentario de rechazo de la idea:',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      input: 'textarea',
      preConfirm: (mensaje) => {
        let comentario = new ComentarioGeneralModel();
        comentario = comentario.of('RECHAZO_IDEA',this.usuarioAut.id,idIdea,mensaje);
        this._comentarioServicio.insertarComentario(comentario).subscribe((resp) => { 
          return true;
        },(catcherror)=>{
          Swal.showValidationMessage('Error al persistir el comentario')
        });
        
      }
    }).then( (result) =>  {
      this.actualizarEstadoIdea(idIdea, estado);
    });
  }

  verFormato(idIdea: number){
    this.router.navigate(['/aprobarFormatoIdea', idIdea]);
  }

  verFormatoJurado(idIdea: number){
    this.router.navigate(['/revisionIdeaJurado', idIdea]);
  }

}