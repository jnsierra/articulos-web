import { AddCommentProfesorComponent } from './../add-comment-profesor/add-comment-profesor.component';
import { ParrafoModel } from './../../../models/parrafo.model';
import { ParrafoService } from './../../../servicios/parrafo.service';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vista-previa-articulo',
  templateUrl: './vista-previa-articulo.component.html',
  styleUrls: ['./vista-previa-articulo.component.css']
})
export class VistaPreviaArticuloComponent implements OnInit {

  @Input()
  idArticulo: number;
  @Input()
  alumno: boolean;

  articulo: ArticuloModel;
  parrafos: ParrafoModel[];
  usuario;



  constructor(private _articuloService: ArticulosService,
    private dialog: MatDialog,
    private _parrafoService: ParrafoService) {
    this.articulo = new ArticuloModel();
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit(): void {
    this.buscaArticulo();
    this.buscarParrafos();
  }

  buscaArticulo() {
    this._articuloService.consultaArticuloById(this.idArticulo).subscribe(resp => {
      if (resp) {
        let art = new ArticuloModel();
        this.articulo = art.of(resp);
      }
    });
  }

  buscarParrafos() {
    this._parrafoService.getParrafosByArtId(this.idArticulo).subscribe(resp => {
      if (resp) {
        console.log('Estos son los parrafos: ', resp)
        this.parrafos = resp;
      }
    });
  }

  adicionarComentarioGeneral(typeComment: string, historico: string) {
    const dialogRef = this.dialog.open(AddCommentProfesorComponent,
      { data: { idArt: this.articulo.id, type: typeComment, historico: historico, idUsuario: this.usuario.id} });
  }

}
