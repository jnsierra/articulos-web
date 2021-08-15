import { DocumentDownload } from './../../../models/DocumentDownload.model';
import { ComentarioFormatoArticuloService } from './../../../servicios/comentarioformatoarticulo.service';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { FormatoService } from './../../../servicios/formato.service';
import { FormatoModel } from './../../../models/formato.model';
import { UtilesBase64Service } from './../../../servicios/utilesBase64.service';
import { DownloadService } from './../../../servicios/download.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ArticulosService } from 'src/app/servicios/articulos.service';

@Component({
  selector: 'app-generar-art-word',
  templateUrl: './generar-art-word.component.html',
  styleUrls: ['./generar-art-word.component.css']
})
export class GenerarArtWordComponent implements OnInit {

  idArticulo: number;
  textError:string;
  textErrorFormato:string;
  archivoCargado:boolean;
  articulo: ArticuloModel;
  formatos: FormatoModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private downloadService: DownloadService,
              private articuloService: ArticulosService,
              private _utilesBase64Service: UtilesBase64Service,
              private _comentarioFormatoArticuloService: ComentarioFormatoArticuloService,
              private _formatoService: FormatoService,
              private _downloadService: DownloadService, 
              private router: Router) {
    this.archivoCargado = false;
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      this.buscarArticulo();
    });
  }

  ngOnInit(): void {
  }

  buscarArticulo(){
    this.articuloService.consultaArticuloById(this.idArticulo).subscribe(resp =>{
      if(resp){
        this.articulo = new ArticuloModel();
        this.articulo = this.articulo.of(resp); 
        if(this.articulo.ubicacion_formato){
          this.archivoCargado=true;
        }       
      }
      this.consultaFormatos();
    });
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
      if(resp && resp.id){
        Swal.fire({title:'Exitoso',type: 'success', text: 'Formato adjunto correctamente'}).then(resp => {
          this.router.navigateByUrl("/listarArticulos");
        });
      }
    });
  }

  async subirFormato(){
    var fileInput = (<HTMLInputElement>document.getElementById("formatoCarga")).files[0];
    if(!fileInput){
      this.textErrorFormato = 'Adjunte el formato word';
      return;      
    }
    let formato = new FormatoModel();
    formato.idArticulo = this.idArticulo;
    formato.formato = "FORMATO_ARTICULO";
    var base =  await this._utilesBase64Service.baseTo64File(fileInput)
    formato.base64FormatoBase = String(base);
    formato.nombre = this._utilesBase64Service.identificaTipoDocumento(fileInput.name);
    this._formatoService.insertarFormatoBaseArt(formato).subscribe(resp => {
      if(resp){
        if(resp.mensaje && resp.mensaje != "OK"){
          Swal.fire({title:'Faltan etiquetas',type: 'error', text: resp.mensaje });
        }else{
          Swal.fire({title:'Exitoso',type: 'success', text: 'Formato adjunto correctamente'}).then(resp => {
            this.buscarArticulo();
          }); 
        }
      }
    });
  }

  consultaFormatos(){
    this._formatoService.consultarFormatoArticulos(this.idArticulo).subscribe(resp => {
      if(resp && resp.length > 0){
        this.formatos = resp;
        this.buscarComentarios();
      }else if(!this.archivoCargado){
        Swal.fire(
          'Sin Informacion',
          'No existen formatos por revisar por favor contacte al administrador',
          'error'
        );
      }
    });
  }

  buscarComentarios(){
    this.formatos.forEach(item => {
      this._comentarioFormatoArticuloService.consultaComentariosByFormato(item.id).subscribe(resp => {
        item.comentarios = resp;
      });      
    }) 
  }

  descargarHistorico(ubicacion: string){
    let documento = new DocumentDownload();
    documento.ubicacion = ubicacion;
    this._downloadService.getDocumentByUbicacion(documento).subscribe(resp => {
      this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
    });
  }

}