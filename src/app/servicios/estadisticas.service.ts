import { CountStateModel } from './../models/countstate.model';
import { HttpClient } from '@angular/common/http';
import { UrlServices } from './../generales/url.entity';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private _urlService: UrlServices, private http: HttpClient) { }

  getEstadisticaIdeaByEstado(){
    const URL_SERVICE = `${this._urlService.getEndPointEstadisticas()}ideas/estado/`;
    return this.http.post<CountStateModel[]>(URL_SERVICE, null);
  }

  getEstadisticaArticulosByEstado(){
    const URL_SERVICE = `${this._urlService.getEndPointEstadisticas()}articulo/estado/`;
    return this.http.post<CountStateModel[]>(URL_SERVICE, null);
  }
}
