import { UploadFormatoIdea } from './../models/uploadformatoidea.model';
import { HttpClient } from '@angular/common/http';
import { UrlServices } from './../generales/url.entity';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormatoIdeaService {

    constructor(private _urlService: UrlServices, private http: HttpClient) { }

    insertaFormatoIdea(formatoIdea: UploadFormatoIdea){
        const URL_SERVICE = `${this._urlService.getEndPointFormatoIDea()}`;
        return this.http.post(URL_SERVICE, formatoIdea);
    }

}