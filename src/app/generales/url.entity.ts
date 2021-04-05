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
    urlBaseDatos: string;


    constructor() {
        this.server = '186.147.239.102';
        this.protocol = 'http';
        this.port = '8080';
        this.context = 'api/';
        this.init();
    }

    init() {
        this.urlBase = environment.urlBaseBussines;
        this.urlBaseDatos = environment.urlBaseDatos;
        console.log('****************');
        console.log(this.urlBase);
        console.log(this.urlBaseDatos);
        console.log('****************');
    }

    getEndPointUsuarios() {
        return `${ this.urlBase }v.1/usuarios/`;
    }

    getEndPointUsuariosDatos() {
        return `${ this.urlBaseDatos }v.1/usuarios/`;
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

    getEndPointIdeaDatos(): string {
        return `${ this.urlBaseDatos }v.1/ideas/`;
    }

    getEndPointArticulo(): string {
        return `${ this.urlBase }v.1/articulos/`; 
    }
    getEndPointArticuloDatos(): string {
        return `${ this.urlBaseDatos }v.1/articulos/`; 
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

    getEndPointDownloadFiles(): string{
        return `${ this.urlBase }v.1/downloadFiles/`;
    }
}