export class UsuarioModel{
    id: number;
    nombre: string;
    email: string;
    password: string;
    tipoUsuario?: string;

    constructor(){}

    public of(objeto: any):UsuarioModel{
        let usuario = new UsuarioModel();
        usuario.id = objeto.id
        usuario.nombre = objeto.nombre;
        usuario.email = objeto.correo;
        return usuario;
    }
}