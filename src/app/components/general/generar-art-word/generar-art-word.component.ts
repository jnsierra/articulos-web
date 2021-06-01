import { title } from 'process';
import { FormatoService } from './../../../servicios/formato.service';
import { FormatoModel } from './../../../models/formato.model';
import { UtilesBase64Service } from './../../../servicios/utilesBase64.service';
import { DownloadService } from './../../../servicios/download.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-art-word',
  templateUrl: './generar-art-word.component.html',
  styleUrls: ['./generar-art-word.component.css']
})
export class GenerarArtWordComponent implements OnInit {

  idArticulo: number;
  textError:string;

  constructor(private activatedRoute: ActivatedRoute,
              private downloadService: DownloadService,
              private _utilesBase64Service: UtilesBase64Service,
              private _formatoService: FormatoService) { 
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
    });
  }

  ngOnInit(): void {
  }

  generarDocumento() {
    this.downloadService.getFormatoArticulo(this.idArticulo).subscribe( resp => {
      if(resp){
        this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
      }
    });
  }

  async subirFormatoArticulo(){
    var fileInput = (<HTMLInputElement>document.getElementById("archivoCarga")).files[0];
    if(!fileInput){
      this.textError = 'Adjunte el documento pdf';
      return;      
    }
    let formato = new FormatoModel();
    formato.idArticulo = this.idArticulo;
    formato.formato = "ARTICULO_POR_CORREGIR";
    formato.estado = "ACTIVO";
    var base =  await this._utilesBase64Service.baseTo64File(fileInput)
    formato.base64 = String(base);
    formato.nombre = this._utilesBase64Service.identificaTipoDocumento(fileInput.name);
    this._formatoService.insertaFormato(formato).subscribe(resp => {
      console.log(resp);
      if(resp && resp.id){
        Swal.fire({title:'Exitoso',type: 'success', text: 'Formato adjunto correctamente'});
      }
    });
  }

}