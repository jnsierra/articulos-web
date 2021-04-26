import { IdeaModel } from './idea.model';

export class ArticuloModel{
    id: number;
    resumen_ingles: string;
    resumen: string;
    titulo: string;
    estado: string;
    ideaId: number;
    contenido: string;
    idea?: IdeaModel;

    constructor(){
        this.idea = new IdeaModel();
    }

    public of(objeto: any): ArticuloModel{
        const articulo = new ArticuloModel();
        articulo.id = objeto.id;
        articulo.resumen_ingles = objeto.resumen_ingles;
        articulo.resumen = objeto.resumen;
        articulo.titulo = objeto.titulo;
        articulo.estado = objeto.estado;
        articulo.contenido = objeto.contenido;
        if( objeto.idea ){
            articulo.idea = articulo.idea.of(objeto.idea);
        }
        try {
            articulo.ideaId = objeto.ideaId;
        } catch (error) {
            console.log(error);
        }
        return articulo;
    }

    public ofListView(objeto: any): ArticuloModel[]{
        const listArticulos = new Array();
        if( Array.isArray(objeto) ){
            for ( const articulo of objeto ) {
                listArticulos.push( this.of( articulo ) );
            }
        }
        return listArticulos;
    }
}