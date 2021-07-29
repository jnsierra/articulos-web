import { FormatoModel } from './../models/formato.model';
import { FormatoIdeaModel } from './../models/formatoIdea.model';
import { UploadFormatoIdea } from './../models/uploadformatoidea.model';
import { HttpClient } from '@angular/common/http';
import { UrlServices } from './../generales/url.entity';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormatoService {

    constructor(private _urlService: UrlServices, private http: HttpClient) { }

    insertaFormato(formato: FormatoModel){
        const URL_SERVICE = `${this._urlService.getEndPointFormato()}`;
        return this.http.post<FormatoModel>(URL_SERVICE, formato);
    }

    insertarFormatoBaseArt(formato: FormatoModel){
        const URL_SERVICE = `${this._urlService.getEndPointFormato()}formatoBase/`
        return this.http.post<FormatoModel>(URL_SERVICE, formato);
    }

    consultarFormatoArticulos(idArt: number){
        const URL_SERVICE = `${this._urlService.getEndPointFormatoDatos()}${idArt}/`;
        return this.http.get<FormatoModel[]>(URL_SERVICE);
    }

}