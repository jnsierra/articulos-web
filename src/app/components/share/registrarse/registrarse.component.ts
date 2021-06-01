import { from } from 'rxjs';
import { MatDatepicker } from '@angular/material/datepicker';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: boolean;
  confirmPass: string;
  picker: string;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = new UsuarioModel();
    this.recordarme = true;
  }

  ngOnInit() {
    if (this.recordarme) {
      this.usuario.email = localStorage.getItem('email');
    }
  }

  registrarse(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.confirmPass != this.usuario.password){
      return ;
    }
    if (this.recordarme) {
      localStorage.setItem('email', this.usuario.email);
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      resp => {
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: 'Usuario registrado de forma correcta. Ya puede ingresar al sistema'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/login');
          }
        });

      }, catchError => {
        Swal.fire({
          type: 'error',
          text: catchError.error.mensaje,
          title: 'Error al intentar registrar el usuario'
        });
      }
    );
  }
}
