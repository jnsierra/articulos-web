import { UsuarioModel } from 'src/app/models/usuario.model';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';
import { HttpClient } from '@angular/common/http';
import { IdeaModel } from '../models/idea.model';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }


  insertarIdea(idea: IdeaModel, usuarioAut: UsuarioModel){
    const ideaDto ={
      usuarioId: usuarioAut.id,
      titulo: idea.titulo,
      contenido: idea.contenido,
      id_profesor: idea.idProfesor,
      estado: 'CREADA'
    };
    const URL_SERVICE = this._urlService.getEndPointIdeaDatos();
    return this.http.post(URL_SERVICE, ideaDto);
  }

  consultaIdeasCreadasByUsuario(idUsuario: number){
    const URL_SERVICE = `${this._urlService.getEndPointIdea()}by/usuarios/`;
    return this.http.get(URL_SERVICE, {params: { id: "" + idUsuario } });
  }

  consultarIdeasProfesorByEstado(idProfesor :number, estado: string){
    const URL_SERVICE = `${this._urlService.getEndPointIdea()}by/profesor/${idProfesor}/`;
    return this.http.get(URL_SERVICE, {params: {estado: estado}});
  }

  actualizarEstadoIdea(idIdea: number, estado: string, idProfesor: number){
    const URL_SERVICE = `${this._urlService.getEndPointIdeaDatos()}estado/${idIdea}/${estado}/${idProfesor}/`;
    return this.http.put(URL_SERVICE,{});
  }

  obtenerIdeaById(id: number){
    const URL_SERVICE = `${ this._urlService.getEndPointIdea() }${ id }/`;
    return this.http.get(URL_SERVICE);
  }

  obtieneIdArtByIdIdea(idIdea: number){
    const URL_SERVICE = `${ this._urlService.getEndPointArticuloDatos() }idea/${ idIdea }/`;
    return this.http.get(URL_SERVICE);
  }

}
