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

  constructor(private _ideaServicio: IdeaService) {
    this.buscarIdeasProfesor();
  }

  ngOnInit() {
  }

  buscarIdeasProfesor() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this._ideaServicio.consultarIdeasProfesorByEstado(this.usuario.id, 'CREADA').subscribe(resp => {
      this.ideas = resp;
    });
    this._ideaServicio.consultarIdeasProfesorByEstado(this.usuario.id, 'EN_ESPERA').subscribe(resp => {
      this.ideasEnEspera = resp;
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

}
