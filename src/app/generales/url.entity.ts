import { OnInit, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UrlServices {

    protocol: string;
    server: string;
    port: string;
    context: string;

    urlBase: string;


    constructor() {
        this.server = '186.147.239.102';
        this.protocol = 'http';
        this.port = '8080';
        this.context = 'api/';
        this.init();
    }

    init() {
        this.urlBase = environment.urlBase;
        console.log(environment.urlBase, "prueba")
        console.log('****************');
        console.log(this.urlBase);
        console.log('****************');
    }

    getEndPointUsuarios() {
        return `${ this.urlBase }v.1/usuarios/`;
    }

    getEndPointLogin(): string {
        return `${ this.urlBase }login/`;
    }

    getEndPointRegistrarse(): string {
        return `${ this.urlBase }v.1/usuarios/`;
    }

    getEndPointIdea(): string {
        return `${ this.urlBase }v.1/ideas/`;
    }

    getEndPointArticulo(): string {
        return `${ this.urlBase }v.1/articulos/`; 
    }

    getEndPointComentario(): string {
        return `${ this.urlBase }v.1/comentario/`;
    }

    getEndPointUpload(): string {
        return `${ this.urlBase }v.1/upload/`;
    }

    getEndPointDownload(): string {
        return `${ this.urlBase }v.1/download/`;
    }

    getEndPointEstadisticas(): string {
        return `${ this.urlBase }v.1/estadisticas/`;
    }
}