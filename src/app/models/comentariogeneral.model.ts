export class ComentarioGeneralModel{

    id?: number;
    tipo_comentario: string;
    id_usuario: number;
    llave: number;
    comentario: string;

    constructor(){}

    public of(tipo_comentario: string, id_usuario: number, llave: number, comentario: string): ComentarioGeneralModel{
        let comentarioGeneral = new ComentarioGeneralModel();
        comentarioGeneral.tipo_comentario = tipo_comentario;
        comentarioGeneral.id_usuario = id_usuario;
        comentarioGeneral.llave = llave;
        comentarioGeneral.comentario = comentario;
        return comentarioGeneral;
    }
    
}