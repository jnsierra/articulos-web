import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ComentarioGeneralModel } from './../../../models/comentariogeneral.model';
import { ComentarioGeneralService } from './../../../servicios/comentariogeneral.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input()
  idIdea: number;
  @Input()
  estadoComentarios: string;
  @Input()
  titulo: string;
  comentarioGeneral: ComentarioGeneralModel[];

  constructor(private _comentarioGeneralService: ComentarioGeneralService,
    private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.buscarComentarios();
  }

  buscarComentarios(){
    this._comentarioGeneralService.consultaComentariosByLlaveAndType(this.idIdea,this.estadoComentarios).subscribe( resp => {
      this.comentarioGeneral = resp;
      //Buscamos el nombre del profesor
      if(resp){
        this.comentarioGeneral.forEach(item => {
          this._usuarioService.obtenerUsuariosById(item.id_usuario).subscribe( resp => {
            let usuario = new UsuarioModel();
            usuario = usuario.of(resp);
            item.nombreProfesor = usuario.nombre;
          });
        });
      }
    });
  }

}
