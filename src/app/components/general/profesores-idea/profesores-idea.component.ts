import { ProfesoresIdeaModel } from './../../../models/profesoresidea.model';
import { IdeaService } from 'src/app/servicios/idea.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesores-idea',
  templateUrl: './profesores-idea.component.html',
  styleUrls: ['./profesores-idea.component.css']
})
export class ProfesoresIdeaComponent implements OnInit {

  @Input()
  idIdea: number;

  profesores: ProfesoresIdeaModel;

  constructor(private _ideaService: IdeaService) {
    this.profesores = new ProfesoresIdeaModel();
   }

  ngOnInit(): void {
    this.buscaProfesor();
  }

  buscaProfesor(){
    this._ideaService.consultarProfesoresByIdIdeas(this.idIdea).subscribe(resp =>{
      if(resp){
        this.profesores = resp;
      }
    })
  }

  
  obtenerProfAsigTutor(): Promise<number>{
    let promesa = new Promise<number>( (response, reject)=>{
      if(this.profesores.idProfTutor){
        return response(this.profesores.idProfTutor);
      }else{
        if(this.profesores.idProfTutor){
          return response(this.profesores.idProfTutor);
        }
        return reject(-1);
      }
    }); 
    return promesa;
  }

}
