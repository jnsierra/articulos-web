import { DibujaProcesoComponent } from './../../../general/dibuja-proceso/dibuja-proceso.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/servicios/idea.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listaideas',
  templateUrl: './listaideas.component.html',
  styles: []
})
export class ListaideasComponent implements OnInit {

  usuario;
  ideas;

  constructor(private _ideasService: IdeaService,
              private _authService: AuthService,
              private dialog: MatDialog,
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

  correccionIdeasJurado(id: number){
    this.router.navigate(['/correccionIdeaJuradoAlumno',id]);
  }

  verFlujo(id: number){
    const dialogRef = this.dialog.open(DibujaProcesoComponent, {data:{idIdea: id}});
  }
  
}