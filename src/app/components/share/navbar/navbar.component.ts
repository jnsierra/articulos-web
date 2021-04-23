import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  firstLetter: string;
  usuario: UsuarioModel;
  notifications: string;
  numNotifi: number;
  notificacionesList: any;


  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private _notificacionesService: NotificacionesService
  ) {
    this.usuario = new UsuarioModel();
    this.numNotifi = -1;
    this.init();
    this.buscarNotificaciones();
  }

  buscarNotificaciones() {
    if (this.usuario) {
      if (this.usuario.tipoUsuario.tipo === 'PROFESOR' && this.numNotifi === -1) {
        this.numNotifi = -2;
        this._notificacionesService
          .consultaNotificacionesProfesor(this.usuario.id)
          .subscribe(resp => {
            this.numNotifi = Number(resp);
            if (this.numNotifi > 0) {
              this.notifications = 'red';
            } else {
              this.notifications = 'sin_notificacion';
            }
          });
      } else if (this.usuario.tipoUsuario.tipo === 'ALUMNO' && this.numNotifi === -1) {
        this.numNotifi = -2;
        this._notificacionesService
          .consultaNotificacionesAlumn(this.usuario.id)
          .subscribe(resp => {
            this.numNotifi = Number(resp);
            if (this.numNotifi > 0) {
              this.notifications = 'red';
            } else {
              this.notifications = 'sin_notificacion';
            }
          });
      }
    }
  }

  

  init() {
    //Obtenemos el objeto usuario
    let usuarioAux = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioAux) {
      this.usuario = {
        ...usuarioAux,
        email: usuarioAux.correo
      };
      this.firstLetter = this.usuario.email.substr(0, 1);
    }
  }

  validaNotificaciones(){
    this.numNotifi = -1;
    this.buscarNotificaciones();
  }


  autenticado(): boolean {
    this.init();
    this.buscarNotificaciones();
    return this.authService.estaAutenticado();
  }

  logout() {
    this.authService.logout();
    this.numNotifi = -1;
    this.router.navigateByUrl('/publico');
  }

  visualizarArticuloNotifi(idArticulo: number, tipoUsuario: string) {
    if(tipoUsuario === 'PROFESOR'){
      this.router.navigateByUrl("/articuloProf/" + idArticulo);
    } else if(tipoUsuario === 'ALUMNO'){
      this.router.navigateByUrl("/articuloAlumn/" + idArticulo);
    }
    console.log(idArticulo);
    console.log(tipoUsuario);
  }

}