import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { IdeaModel } from './../../../../models/idea.model';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/servicios/idea.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  selected = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private _usuarioService: UsuarioService,
    private _ideaService: IdeaService,
    private router: Router) {
    this.idea = new IdeaModel();
    this.profesores = [];
    this.buscarProfesores();
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
    this._ideaService.insertarIdea(this.idea).subscribe(resp => {
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
      console.log(this.profesores);
    });
  }

  validaProfesor(): boolean{
    if(this.idea.idProfesor){
      return true;
    }
    return false;
  }

}
