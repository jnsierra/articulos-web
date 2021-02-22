import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: boolean;

  constructor(private authServices: AuthService,
              private router: Router,
              private usuarioService: UsuarioService) {
    this.usuario = new UsuarioModel();
    this.recordarme = true;
  }

  ngOnInit() {
    if ( this.recordarme ) {
      this.usuario.email = localStorage.getItem('email');
    }
  }

  ingresar(form: NgForm){
    //Valido si el formulario es valido
    if(form.invalid){
      return ;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen : () =>{
        Swal.showLoading()
      }
    });
    if ( this.recordarme ) {
      localStorage.setItem('email', this.usuario.email);
    }
    this.authServices.login( this.usuario ).subscribe( resp => {
      console.log(resp, "Respuesta de mi servicio: ")
      Swal.close();
      localStorage.setItem('email', this.usuario.email);
      this.consultarUsuarioAutenticado(this.usuario.email);
    }, catchError => {
      if(catchError.status === 401 ){
        Swal.fire({
          type: 'error',
          text: catchError.error.mensaje,
          title: 'Error de usuario o contraseña'
        });
      } else {
        Swal.fire({
          type: 'error',
          text: 'Error en el sistema contacte al administrador',
          title: 'Error'
        });
      }
    });
  }

  consultarUsuarioAutenticado(email: string): void {
    this.usuarioService.consultarUsuarioByEmail(email).subscribe( resp => {
      const USUARIO_PERSIST = resp[0];
      localStorage.setItem('usuario', JSON.stringify(USUARIO_PERSIST));
      this.router.navigateByUrl('/home');
    });
  }

}
