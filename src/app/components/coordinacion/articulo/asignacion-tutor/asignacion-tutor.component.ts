import { ArticuloModel } from './../../../../models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { DibujaProcesoComponent } from './../../../general/dibuja-proceso/dibuja-proceso.component';
import { Router } from '@angular/router';
import { IdeaModel } from 'src/app/models/idea.model';
import { IdeaService } from 'src/app/servicios/idea.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-asignacion-tutor',
  templateUrl: './asignacion-tutor.component.html',
  styleUrls: ['./asignacion-tutor.component.css']
})
export class AsignacionTutorComponent implements OnInit {

  listIdeas: IdeaModel[];
  listaArticulos: ArticuloModel[];

  constructor(private _ideasService: IdeaService,
    private _articulosService: ArticulosService,
    private dialog: MatDialog,
    private router: Router,
    ) {
    this.listIdeas = new Array(0);
    this.listaArticulos = new Array(0);
    this.consultaIdeas();
    this.consultaArticulos();
  }

  ngOnInit(): void {
  }
  
  consultaIdeas(){11
    this._ideasService.consultarIdeasByEstado('ESPERA_JURADO').subscribe(resp =>{
      if(resp){
        this.listIdeas = resp;
      }
    });
  }

  consultaArticulos(){
    this._articulosService.consultaByEstados("ESPERA_PUBLICACION_CORDINACION").subscribe(resp => {
      if(resp){
        this.listaArticulos = resp;
      }
    });
  }

  asignarJurado(idIdea: number){
    this.router.navigate(['/asignacionTutorIdea', idIdea]);
  }

  verFlujo(id: number){
    const dialogRef = this.dialog.open(DibujaProcesoComponent, {data:{idIdea: id}});
  }

}
