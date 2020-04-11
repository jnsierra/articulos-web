import { UploadArticulo } from 'src/app/models/uploadarticulo.model';
import { DownloadService } from './../../servicios/download.service';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario;
  articulos: ArticuloModel[];

  constructor(private _articuloService: ArticulosService,
    private _downloadService: DownloadService) {
    this.buscaArticulosByAlumno();
  }

  buscaArticulosByAlumno() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this._articuloService.consultaArticulosAlumnoPublicados(this.usuario.id).subscribe(resp => {
      this.articulos = new ArticuloModel().ofListView(resp);
    });
  }

  obtenerPdf(idArticulo: number) {
    this._downloadService.getPdfArticulo(idArticulo).subscribe(resp => {
      let pdfWindow = window.open("");
      pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(resp.base64) + "'></iframe>");
    });
  }

  ngOnInit() {
  }

}
