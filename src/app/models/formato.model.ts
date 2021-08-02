import { ComentarioFormatoArticuloModel } from './comentarioformatoarticulo.model';
export class FormatoModel{

    id:number;
    ubicacion:string;
    estado:string;
    nombre:string;
    formato:string;
    idArticulo:number;
    base64?:string;
    base64FormatoBase?:string;
    mensaje?:string;
    comentarios?: ComentarioFormatoArticuloModel[];

    constructor(){}
    
}