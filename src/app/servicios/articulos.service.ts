import { ArticuloModel } from './../models/articulo.model';
import { HttpClient } from '@angular/common/http';
import { UrlServices } from './../generales/url.entity';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  guardarArticulo(articulo: ArticuloModel){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}`;
    return this.http.post(URL_SERVICE, articulo);
  }

  consultaArticuloById(id: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticuloDatos()}by/${id}/`;
    return this.http.get(URL_SERVICE);
  }

  actualizarEstadoArticulo(id: number, estado: string){
    const URL_SERVICE = `${this._urlService.getEndPointArticuloDatos()}cambiarestado/?idArticulo=${id}&estado=${estado}`;
    return this.http.put(URL_SERVICE, null);
  }

  consultaTituloNotificacion(idProfesor: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}profesor/notificaciones/titulos/${idProfesor}/`;
    return this.http.get(URL_SERVICE);
  }
  
  consultaTituloNotificacionAlumn(idAlumn: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}alumno/notificaciones/titulos/${idAlumn}/`;
    return this.http.get(URL_SERVICE);
  }

  consultarHistArtById(idIdea: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}idea/${idIdea}`;
    return this.http.get(URL_SERVICE);
  }

  consultaArticulosAlumnoAprobados(idAlumno: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}alumno/aprobados/${idAlumno}/`;
    return this.http.get(URL_SERVICE);
  }
  
  consultaArticulosAlumnoPublicados(idAlumno: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}alumno/publicados/${idAlumno}/`;
    return this.http.get(URL_SERVICE);
  }

  consultarArticulosByUsuario(idAlumno: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticuloDatos()}idea/user/${idAlumno}/`;
    return this.http.get<ArticuloModel[]>(URL_SERVICE);
  }

  actualizarArticulo(articulo: ArticuloModel){
    const URL_SERVICE = `${this._urlService.getEndPointArticuloDatos()}`;
    return this.http.put<ArticuloModel>(URL_SERVICE, articulo);
  }

  consultarArticulosTutorAndEstado(idTutor: number, estado: string){
    const URL_SERVICE = `${this._urlService.getEndPointArticuloDatos()}profesor/${idTutor}/${estado}/`;
    return this.http.get<ArticuloModel[]>(URL_SERVICE);
  }
}
