export class UploadFormatoIdea{
    idIdea?: number;
    base64?: string;
    formato?: string;
    tipo?: string;

    constructor(){}

    of(objeto: any): UploadFormatoIdea{
        const file = new UploadFormatoIdea();
        file.idIdea = objeto.idIdea;
        file.base64 = objeto.base64;
        file.formato = objeto.formato;
        return file;
    }
}