export class UploadArticulo{
    idArticulo?: number;
    base64?: string;

    constructor(){}

    of(objeto: any): UploadArticulo{
        const file = new UploadArticulo();
        file.idArticulo = objeto.idArticulo;
        file.base64 = objeto.base64;
        return file;
    }
}