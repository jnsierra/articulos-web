import { ComentarioGeneralModel } from './../../../../models/comentariogeneral.model';
import { ComentarioGeneralService } from './../../../../servicios/comentariogeneral.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { IdeaService } from 'src/app/servicios/idea.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { IdeaModel } from 'src/app/models/idea.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styles: []
})
export class ActualizarComponent implements OnInit {

  idIdea: number;
  idea: IdeaModel;
  profesores;
  usuarioAut: UsuarioModel;
  comentarioGeneral: ComentarioGeneralModel[];
  usuarios: UsuarioModel[];

  selected = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private _usuarioService: UsuarioService,
    private _ideaService: IdeaService,
    private _comentarioGeneralService: ComentarioGeneralService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usuarios = [];
    this.idea = new IdeaModel();
    this.usuarioAut =  JSON.parse(localStorage.getItem('usuario'));
    this.activatedRoute.params.subscribe(params => {
      this.idIdea = Number(params['id']);
      this.buscarComentariosRechazo();
      this.buscarProfesores();
    }); 
   }

  ngOnInit(): void {
  }

  actualizarIdea(f: NgForm) {
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
    this._ideaService.actualizaIdea(this.idea, this.usuarioAut).subscribe(resp => {
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
      this.buscaIdeaById();
    });
  }

  buscaIdeaById(){
    this._ideaService.obtenerIdeaById(this.idIdea).subscribe(resp => {
      this.idea = this.idea.ofWithIdProf(resp);
    });
  }

  buscarComentariosRechazo(){
    this._comentarioGeneralService.consultaComentariosByLlaveAndType(this.idIdea,'RECHAZO_IDEA').subscribe( resp => {
      this.comentarioGeneral = resp;
      //Buscamos el nombre del profesor
      this.comentarioGeneral.forEach(item => {
        this._usuarioService.obtenerUsuariosById(item.id_usuario).subscribe( resp => {
          let usuario = new UsuarioModel();
          usuario = usuario.of(resp);
          item.nombreProfesor = usuario.nombre;
        });
      });
    }); 
  }

}
 