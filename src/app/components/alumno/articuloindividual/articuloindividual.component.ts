import { AuthService } from './../../../servicios/auth.service';
import { ArticulosService } from './../../../servicios/articulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/servicios/idea.service';
import Swal from 'sweetalert2';
import { ComentariosService } from 'src/app/servicios/comentarios.service';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { IdeaModel } from 'src/app/models/idea.model';
import { ComentarioModel } from 'src/app/models/comentario.model';

@Component({
  selector: 'app-articuloindividual',
  templateUrl: './articuloindividual.component.html',
  styleUrls: ['./articuloindividual.component.css']
})
export class ArticuloindividualComponent implements OnInit {

  idIdea: number;
  articulo: ArticuloModel;
  comentarios: ComentarioModel[];
  articulosHis: ArticuloModel[];
  idArticulo: number;

  constructor(private activatedRoute: ActivatedRoute,
    private _ideaService: IdeaService,
    private _comentarioService: ComentariosService,
    private _articuloService: ArticulosService,
    private _authService: AuthService,
    private router: Router
  ) {
    this.comentarios = new Array();
    this.articulosHis = new Array();
    this.articulo = new ArticuloModel();
    this.activatedRoute.params.subscribe(params => {
      this.idIdea = Number(params['id']);
    });
  }

  obtieneIdArticuloByIdea() {
    this._ideaService.obtieneIdArtByIdIdea(this.articulo.idea.id).subscribe(resp => {
      this.idArticulo = Number(resp);
    }, catchError => {
      console.log(catchError);
    } );
  }

  obtieneComentariosProfArt() {
    this._comentarioService.consultaComentariosByIdArticulo(this.idArticulo)
      .subscribe(resp => {
        let comentarioAux = new ComentarioModel();
        this.comentarios = comentarioAux.ofList(resp);
      });
  }

  obtieneHistorialArticulos(){
    this._articuloService.consultarHistArtById( this.idIdea ).subscribe(resp => {
      let aux = new ArticuloModel();
      this.articulosHis = aux.ofListView(resp);
    });
  }

  ngOnInit() {
  }

}
