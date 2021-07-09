import { UtilesBase64Service } from './../../../../servicios/utilesBase64.service';
import { DownloadService } from './../../../../servicios/download.service';
import { DocumentDownload } from './../../../../models/DocumentDownload.model';
import { ArticuloModel } from './../../../../models/articulo.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/servicios/articulos.service';

@Component({
  selector: 'app-revision-formato',
  templateUrl: './revision-formato.component.html',
  styleUrls: ['./revision-formato.component.css']
})
export class RevisionFormatoComponent implements OnInit {

  idArticulo: number;
  articulo: ArticuloModel;

  constructor(private activatedRoute: ActivatedRoute,
    private _articulosService: ArticulosService,
    private _utilesBase64Service: UtilesBase64Service,
    private _downloadService: DownloadService) {
    this.articulo = new ArticuloModel();
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      this.buscaArticulo();
    });
   }

  ngOnInit(): void {
  }

  buscaArticulo(){
    this._articulosService.consultaArticuloById(this.idArticulo).subscribe(resp => {
      if(resp){
        this.articulo = this.articulo.of(resp);
        console.log(this.articulo);
      }
    });
  }

  descargarFormato(){
    let documento = new DocumentDownload();
    documento.ubicacion = this.articulo.ubicacion_formato;
    this._downloadService.getDocumentByUbicacion(documento).subscribe(resp => {
      this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
    });
  }

}