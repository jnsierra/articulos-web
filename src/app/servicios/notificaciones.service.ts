import { Injectable } from '@angular/core';
import { UrlServices } from '../generales/url.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {

    constructor(private _urlService: UrlServices, private http: HttpClient) { }

    consultaNotificacionesProfesor(idProfesor: number) {
        const URL_SERVICE = `${this._urlService.getEndPointNotificaciones()}profesor/${idProfesor}/`;
        return this.http.get(URL_SERVICE);
    }

    consultaNotificacionesAlumn(idAlumn: number) {
        const URL_SERVICE = `${this._urlService.getEndPointArticulo()}alumno/${idAlumn}/`;
        return this.http.get(URL_SERVICE);
    }

}