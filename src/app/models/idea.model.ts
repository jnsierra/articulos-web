import { ProfesorModel } from './profesor.model';
import { UsuarioModel } from './usuario.model';

export class IdeaModel{
    id: number;
    titulo: string;
    contenido: string;
    estado: string;
    idProfesor: string;
    usuario?: UsuarioModel;
    fechaAprobacion?: any;
    profesorAsignado?: string;
    profesorAutoriza?: string;

    constructor(){
        this.usuario = new UsuarioModel();
    }

    public of(objeto: any): IdeaModel{
        let idea = new IdeaModel();
        idea.id = objeto.id;
        idea.contenido = objeto.contenido;
        idea.titulo = objeto.titulo;
        idea.fechaAprobacion = objeto.fechaAprobacion;
        idea.profesorAsignado = objeto.profesorAsignado;
        idea.profesorAutoriza = objeto.profesorAutoriza;
        idea.usuario = this.usuario.of( objeto.usuario );
        return idea;
    }

    public ofWithOutProf(objeto: any): IdeaModel{
        let idea = new IdeaModel();
        idea.id = objeto.id;
        idea.contenido = objeto.contenido;
        idea.titulo = objeto.titulo;
        idea.fechaAprobacion = objeto.fechaAprobacion;
        return idea;
    }

    public ofWithIdProf(objeto: any): IdeaModel{
        let idea = new IdeaModel();
        idea.id = objeto.id;
        idea.contenido = objeto.contenido;
        idea.titulo = objeto.titulo;
        idea.fechaAprobacion = objeto.fechaAprobacion;
        idea.profesorAsignado = objeto.profesorAsignado;
        idea.profesorAutoriza = objeto.profesorAutoriza;
        idea.idProfesor = objeto.id_profesor;
        idea.usuario = this.usuario.of( objeto.usuario );
        return idea;
    }
}