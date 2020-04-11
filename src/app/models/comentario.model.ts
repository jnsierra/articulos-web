export class ComentarioModel{

    id?: number;
    comentario: string;
    articuloId: number;

    constructor(){}

    public of(comentarioStr: string, idArticulo: number): ComentarioModel{
        let comentario = new ComentarioModel();
        comentario.comentario = comentarioStr;
        comentario.articuloId = idArticulo;
        return comentario;
    }

    public ofList(objeto: any):ComentarioModel[]{
        let comentarios: ComentarioModel[] = new Array();
        if( Array.isArray(objeto)  ){
            for(let i=0; i < objeto.length; i++ ){
                let aux = new ComentarioModel();
                aux.comentario = objeto[i].comentario;
                aux.articuloId = objeto[i].articuloId;
                aux.id = objeto[i].id;
                comentarios.push(aux);
                console.log(objeto[i]);
            }
        }
        return comentarios;
    }
}