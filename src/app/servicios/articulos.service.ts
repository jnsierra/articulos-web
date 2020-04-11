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
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}/`;
    return this.http.post(URL_SERVICE, articulo);
  }

  consultaArticuloById(id: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}${id}/`;
    return this.http.get(URL_SERVICE);
  }

  actualizarEstadoArticulo(id: number, estado: string){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}cambiarestado/?idArticulo=${id}&estado=${estado}`;
    return this.http.put(URL_SERVICE, null);
  }

  consultaTituloNotificacion(idProfesor: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}profesor/notificaciones/titulos/${idProfesor}/`;
    return this.http.get(URL_SERVICE);
  }

  consultaNotificaciones(idProfesor: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}profesor/notificaciones/${idProfesor}/`;
    return this.http.get(URL_SERVICE);
  }

  consultaNotificacionesAlumn(idAlumn: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}alumno/notificaciones/${idAlumn}/`;
    return this.http.get(URL_SERVICE);
  }

  consultaTituloNotificacionAlumn(idAlumn: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}alumno/notificaciones/titulos/${idAlumn}/`;
    return this.http.get(URL_SERVICE);
  }

  consultarHistArtById(idIdea: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}/idea/${idIdea}`;
    return this.http.get(URL_SERVICE);
  }

  consultaArticulosAlumnoAprobados(idAlumno: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}/alumno/aprobados/${idAlumno}/`;
    return this.http.get(URL_SERVICE);
  }
  
  consultaArticulosAlumnoPublicados(idAlumno: number){
    const URL_SERVICE = `${this._urlService.getEndPointArticulo()}/alumno/publicados/${idAlumno}/`;
    return this.http.get(URL_SERVICE);
  }
}
