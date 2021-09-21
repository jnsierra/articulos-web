import { Injectable } from "@angular/core";
import { UrlServices } from "../generales/url.entity";
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: any;

  constructor(private url: UrlServices, private http: HttpClient) {}

  registrarUsuario(usuario: UsuarioModel) {
    const personaDto = {
      nombres: usuario.nombre,
      apellidos: usuario.persona.apellidos,
      fechaNacimiento: usuario.persona.fechaNacimiento,
      documento: usuario.persona.documento,
    };
    const usuarioDto = {
      correo: usuario.email,
      contrasena: usuario.password,
      nombre: usuario.nombre,
      cambioContra: "S",
      codigo: usuario.codigo,
      persona: personaDto,
    };
    return this.http.post(this.url.getEndPointRegistrarse(), usuarioDto);
  }

  consultarUsuarioByEmail(email: string) {
    const URL_SERVICE = `${this.url.getEndPointUsuarios()}by/?correo=${email}`;
    return this.http.get(URL_SERVICE);
  }

  consultarUsuarioByTipoUsuario(tipoUsuario: string) {
    const URL_SERVICE = `${this.url.getEndPointUsuariosDatos()}/by/?tipoUsuario=${tipoUsuario}`;
    return this.http.get(URL_SERVICE);
  }
  consultarUsuarioByTipoUsuarioEntity(tipoUsuario: string) {
    const URL_SERVICE = `${this.url.getEndPointUsuariosDatos()}/by/?tipoUsuario=${tipoUsuario}`;
    return this.http.get<UsuarioModel[]>(URL_SERVICE);
  }

  leerUsuario(): string {
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.usuario = new Object();
    }
    return this.usuario;
  }

  obtenerUsuarios() {
    const URL_SERVICE = `${this.url.getEndPointUsuarios()}/`;
    return this.http.get(URL_SERVICE);
  }

  obtenerUsuariosById(id: number) {
    const URL_SERVICE = `${this.url.getEndPointUsuarios()}${id}/`;
    return this.http.get(URL_SERVICE);
  }

  modificarTipoUsuario(usuario: any) {
    console.log(usuario);
    const usuarioDto = {
      id: usuario.id,
      tipoUsuario: usuario.tipoUsuario.id,
      estado: usuario.estado,
    };
    const URL_SERVICE = `${this.url.getEndPointUsuariosDatos()}`;
    return this.http.put(URL_SERVICE, {}, { params: { id: usuarioDto.id, estado: usuarioDto.estado, tipoUsuario: usuarioDto.tipoUsuario } });
  }

  recuperarContrasenia(correo: string){
    const URL_SERVICE = `${this.url.getEndPointUsuarios()}recuperarPass/${correo}/`;
    return this.http.post(URL_SERVICE,{});
  }
}
