import { PersonaModel } from './persona.model';
import { TipoUsuarioModel } from './tipousuario.model';
export class UsuarioModel{
    id: number;
    nombre: string;
    email: string;
    password: string;
    tipoUsuario?: TipoUsuarioModel;
    persona: PersonaModel;

    constructor(){
        this.tipoUsuario = new TipoUsuarioModel();
        this.persona = new PersonaModel();
    }

    public of(objeto: any):UsuarioModel{
        let usuario = new UsuarioModel();
        usuario.id = objeto.id
        usuario.nombre = objeto.nombre;
        usuario.email = objeto.correo;
        return usuario;
    }
}