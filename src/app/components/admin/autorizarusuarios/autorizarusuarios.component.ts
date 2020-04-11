import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorizarusuarios',
  templateUrl: './autorizarusuarios.component.html',
  styleUrls: ['./autorizarusuarios.component.css']
})
export class AutorizarusuariosComponent implements OnInit {

  dataSourceUsu: IUsuarioConsulta[];
  displayedColumnsUsu: string[] = ['id','nombre', 'email','tipoUsuario', 'accion'];

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
    //obtenemos los usuarios
    this.usuarioService.obtenerUsuarios().subscribe( resp => {
      this.dataSourceUsu = this.mapperUsuario(<any[]>resp);
    });
  }

  mapperUsuario(usuario: any[]): IUsuarioConsulta[]{
    return usuario.map(function(item){
      let usuarioItem: IUsuarioConsulta= {
        id : item['id'],
        nombre : item['nombre'],
        email: item['correo'],
        tipoUsuario: item['tipoUsuario']
      };
      return usuarioItem;
    });
  }

  actualizarUsuario(usuario: IUsuarioConsulta){
    //Envio el usuario para actualizarlo
    this.router.navigate(['actUsuario', usuario.id]);
  }

}

export interface IUsuarioConsulta{
  id: number,
  nombre: string,
  email: string,
  tipoUsuario: string
}
