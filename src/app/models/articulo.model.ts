import { IdeaModel } from './idea.model';

export class ArticuloModel{
    id: number;
    resumenIngles: string;
    resumenEspanol: string;
    titulo: string;
    estado: string;
    ideaId: number;
    idea?: IdeaModel;

    constructor(){
        this.idea = new IdeaModel();
    }

    public of(objeto: any): ArticuloModel{
        const articulo = new ArticuloModel();
        articulo.id = objeto.id;
        articulo.resumenIngles = objeto.resumenIngles;
        articulo.resumenEspanol = objeto.resumenEspanol;
        articulo.titulo = objeto.titulo;
        articulo.estado = objeto.estado;
        if( objeto.idea ){
            articulo.idea = articulo.idea.of(objeto.idea);
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