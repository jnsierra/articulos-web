import { DibujaProcesoComponent } from './../../../general/dibuja-proceso/dibuja-proceso.component';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { IdeaModel } from './../../../../models/idea.model';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/servicios/idea.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crearidea',
  templateUrl: './crearidea.component.html',
  styleUrls: ['./crearidea.component.css']
})
export class CrearideaComponent implements OnInit {

  idea: IdeaModel;
  profesores;
  usuarioAut: UsuarioModel;

  selected = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private _usuarioService: UsuarioService,
    private _ideaService: IdeaService,
    private dialog: MatDialog,
    private router: Router) {
    this.idea = new IdeaModel();
    this.profesores = [];
    this.buscarProfesores();
    this.usuarioAut =  JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit() {
  }

  crearIdea(f: NgForm) {
    if( f.invalid ){
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
    this._ideaService.insertarIdea(this.idea, this.usuarioAut).subscribe(resp => {
      console.log(resp);
      Swal.fire({
        allowOutsideClick: false,
        type: 'success',
        text: 'Idea registrada correctamente. El profesor sera notificado'
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/listaIdeas');
        }
      });
    }, catchError => {
      Swal.fire({
        type: 'error',
        text: 'Error al crear la ide por favor intente más tarde',
        title: 'Error Idea'
      });
    });
  }

  buscarProfesores(){
    this._usuarioService.consultarUsuarioByTipoUsuario('PROFESOR').subscribe( resp => {
      this.profesores = resp;
    });
  }

  validaProfesor(): boolean{
    if(this.idea.idProfesor){
      return true;
    }
    return false;
  }

  verFlujo(){
    const dialogRef = this.dialog.open(DibujaProcesoComponent, {data:{idIdea: -1}});
  }

}