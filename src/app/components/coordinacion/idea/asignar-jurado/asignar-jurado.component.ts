import { IdeaService } from 'src/app/servicios/idea.service';
import { MyErrorStateMatcher } from './../../../alumno/idea/actualizar/actualizar.component';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ProfesoresIdeaComponent } from './../../../general/profesores-idea/profesores-idea.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { title } from 'process';

@Component({
  selector: 'app-asignar-jurado',
  templateUrl: './asignar-jurado.component.html',
  styleUrls: ['./asignar-jurado.component.css']
})
export class AsignarJuradoComponent implements OnInit {

  idIdea: number;
  profesores:UsuarioModel[];
  @ViewChild(ProfesoresIdeaComponent)
  profesoresComponent: ProfesoresIdeaComponent;
  idJurado:number;

  selected = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private activatedRoute: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _ideaService: IdeaService,
    private router: Router) {
      
    this.activatedRoute.params.subscribe(params => {
      this.idIdea = Number(params['id']);     
      this.buscarProfesores(); 
    });
  }

  ngOnInit(): void {
  }

  buscarProfesores(){
    this._usuarioService.consultarUsuarioByTipoUsuarioEntity('PROFESOR').subscribe( resp => {
      this.profesores = resp;
      setTimeout( resp => this.eliminaUsuarioTutor(), 2000);
    });
  }

  eliminaUsuarioTutor(){
    this.profesoresComponent.obtenerProfAsigTutor().then(resp => {
      let idTutor = resp;
      if(resp != -1){
        this.profesores = this.profesores.filter(item => item.id != idTutor);
      }
      
    });
  }

  asignarJurado(f: NgForm){
    if(f.invalid){
      return ;
    }
    //Actualizamos la idea con el jurado
    this._ideaService.asignarJuradoIdea(this.idIdea, this.idJurado).subscribe(resp => {
      if(resp){
        this._ideaService.actualizarEstadoIdeaSinProf(this.idIdea, "APROBACION_FORMATO_JURADO").subscribe(respuesta => {
          if(respuesta){
            Swal.fire({
              allowOutsideClick: false,
              type: 'success',
              text: "Asignación de tutor correcta",
              title: 'ASIGNACIÓN'
            }).then((result) => {
              this.router.navigateByUrl('/asignacionTutor');
            });            
          }
        });
      }
    });
  }

}
