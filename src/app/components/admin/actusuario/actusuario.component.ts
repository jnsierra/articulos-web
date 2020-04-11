import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-actusuario',
  templateUrl: './actusuario.component.html',
  styleUrls: ['./actusuario.component.css']
})
export class ActusuarioComponent implements OnInit {

  usuario;

  selTipoUsuario = [
    {value: 'ADMIN', viewValue: 'Administrador'},
    {value: 'PROFESOR', viewValue: 'Profesor'},
    {value: 'ALUMNO', viewValue: 'Alumno'}
  ];

  constructor(private activatedRoute: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private router: Router) {
    this.usuario = {
      correo: '',
      nombre: ''
    };
    this.activatedRoute.params.subscribe( params => {
      this.buscaUsuarioById(Number(params['id']));
    });
  }

  ngOnInit() {
  }

  buscaUsuarioById(id: number){
    this._usuarioService.obtenerUsuariosById(id).subscribe(resp => {
      this.usuario = {
        ... resp
      }
    });
  }

  actualizarTipo( f:NgForm ){
    if(!this.usuario['tipoUsuario']){
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this._usuarioService.modificarTipoUsuario(this.usuario).subscribe( resp => {
      if(resp){
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: 'Usuario actualizado correctamente.'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/admAuUsuario');
          }
        });
      }else{
        Swal.fire({
          type: 'error',
          text: 'Error al modificar el tipo de usuario'
        });
      }
      console.log(resp);
    });

  }

  nonSubmited(  ){
    if(this.usuario['tipoUsuario']){
      return false;
    }
    return true;
  }
}
