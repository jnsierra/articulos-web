import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/servicios/idea.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaideas',
  templateUrl: './listaideas.component.html',
  styles: []
})
export class ListaideasComponent implements OnInit {

  usuario;
  ideas;

  constructor(private _ideasService: IdeaService,
              private _usuarioService: UsuarioService,
              private _authService: AuthService,
              private router: Router) {
    this.consultaIdeas();
  }

  ngOnInit() {
  }

  consultaIdeas(){
    //Obtenemos el usuario
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this._ideasService.consultaIdeasCreadasByUsuario(this.usuario.id).subscribe(resp => {
      this.ideas = resp;
    },  catchError => {
      if(catchError.status === 403){
        Swal.fire({
          allowOutsideClick: false,
          type: 'error',
          text: 'Error de autenticacion por favor ingrese de nuevo'
        }).then( (result) => {
          if (result.value ){
            this._authService.logout();
            this.router.navigateByUrl('/login');
          }
        });
      }
    });
  }

  consultaArticuloByIdea(id: number){
    this.router.navigate(['/articuloAlumn', id]);
  }

  actualizarIdea(id:number){
    this.router.navigate(['/actualizarIdea', id]);
  }

  cargarFormato(id:number){
    this.router.navigate(['/cargarFormato',id]);
  }
  
}