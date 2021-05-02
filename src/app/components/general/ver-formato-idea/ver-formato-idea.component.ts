import { DocumentDownload } from './../../../models/DocumentDownload.model';
import { DownloadService } from './../../../servicios/download.service';
import { UtilesBase64Service } from './../../../servicios/utilesBase64.service';
import { FormatoIdeaModel } from './../../../models/formatoIdea.model';
import { FormatoIdeaService } from './../../../servicios/formatoIdea.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ver-formato-idea',
  templateUrl: './ver-formato-idea.component.html',
  styleUrls: ['./ver-formato-idea.component.css']
})
export class VerFormatoIdeaComponent implements OnInit {

  @Input()
  titulo: string;
  @Input()
  idIdea: number;
  @Input()
  tipoFormato: string;

  listVerFormato: FormatoIdeaModel[];

  @Output()
  varDocumento: EventEmitter<boolean>;

  constructor(
    private _formatoIdeaService: FormatoIdeaService,
    private _utilesBase64Service: UtilesBase64Service,
    private _downloadService: DownloadService) {
      this.varDocumento = new EventEmitter();
    }

  ngOnInit(): void {
    this.buscaVersionesFormato();
  }

  buscaVersionesFormato(){
    this._formatoIdeaService.getFormatoByIdIdeaAndFormato(this.idIdea, this.tipoFormato).subscribe(resp => {
      if(resp){
        this.listVerFormato = resp;
      }
    });
  }

  descargarDocumento(ubicacion: string, nombre: string){
    let documento = new DocumentDownload();
    documento.ubicacion = ubicacion;
    this._downloadService.getDocumentByUbicacion(documento).subscribe(resp => {
      this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
    });
    this.varDocumento.emit(true);
  } 

}
