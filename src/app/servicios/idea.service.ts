import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';
import { HttpClient } from '@angular/common/http';
import { IdeaModel } from '../models/idea.model';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }


  insertarIdea(idea: IdeaModel){
    const ideaDto ={
      titulo: idea.titulo,
      contenido: idea.contenido,
      idProfesor: idea.idProfesor,
      estado: 'CREADA'
    };
    const URL_SERVICE = this._urlService.getEndPointIdea();
    return this.http.post(URL_SERVICE, ideaDto);
  }

  consultaIdeasCreadasByUsuario(idUsuario: number){
    const URL_SERVICE = `${this._urlService.getEndPointIdea()}by/?idUsuario=${idUsuario}`;
    return this.http.get(URL_SERVICE);
  }

  consultarIdeasProfesorByEstado(idProfesor :number, estado: string){
    const URL_SERVICE = `${this._urlService.getEndPointIdea()}profesor/${idProfesor}/?estado=${estado}`;
    return this.http.get(URL_SERVICE);
  }

  actualizarEstadoIdea(idIdea: number, estado: string, idProfesor: number){
    const URL_SERVICE = `${this._urlService.getEndPointIdea()}estado/${idIdea}/${estado}/${idProfesor}/`;
    return this.http.get(URL_SERVICE);
  }

  obtenerIdeaById(id: number){
    const URL_SERVICE = `${ this._urlService.getEndPointIdea() }${ id }/`;
    return this.http.get(URL_SERVICE);
  }

  obtieneIdArtByIdIdea(idIdea: number){
    const URL_SERVICE = `${ this._urlService.getEndPointIdea() }${ idIdea }/articulo/`;
    return this.http.get(URL_SERVICE);
  }

}
