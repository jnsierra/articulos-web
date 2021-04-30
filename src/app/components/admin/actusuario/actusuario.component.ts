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
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Profesor'},
    {value: 3, viewValue: 'Alumno'},
    {value: 4, viewValue: 'Coordinación'},
  ];

  selEstado = [
    {value: 'ACTIVO', viewValue: 'Activo'},
    {value: 'INACTIVO', viewValue: 'Inactivo'}
  ];

  constructor(private activatedRoute: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private router: Router) {
    const TipoUsuario = {
      id: 1, 
      descripcion: ''
    }
    this.usuario = {
      correo: '',
      nombre: '',
      tipoUsuario: TipoUsuario
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
    if(!this.usuario['estado']){
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
    if(this.usuario['estado']){
      return false;
    }
    return true;
  }
}
