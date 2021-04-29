import { ParrafoModel } from './../models/parrafo.model';
import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ParrafoService {

    constructor(private _urlService: UrlServices, private http: HttpClient) { }

    guardarParrafo(parrafoModel: ParrafoModel){
        const URL_SERVICE = `${this._urlService.getEndPointParrafoDatos()}`;
        return this.http.post<ParrafoModel>(URL_SERVICE, parrafoModel);
    }

    getParrafosByArtId(idArt: number){
        const URL_SERVICE = `${this._urlService.getEndPointParrafoDatos()}articulo/${idArt}`;
        return this.http.get<ParrafoModel[]>(URL_SERVICE);
    }

}