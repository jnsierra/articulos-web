import { ArticulosService } from './../../../../servicios/articulos.service';
import { CartaPublicacionService } from './../../../../servicios/cartapublicacionservice';
import { UtilesBase64Service } from './../../../../servicios/utilesBase64.service';
import { DocumentoUploadModel } from './../../../../models/documentoupload.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-carta-publicacion',
  templateUrl: './upload-carta-publicacion.component.html',
  styleUrls: ['./upload-carta-publicacion.component.css']
})
export class UploadCartaPublicacionComponent implements OnInit {

  idArticulo: number;
  textErrorFormato: string;

  constructor(private activatedRoute: ActivatedRoute,
    private _utilesBase64Service: UtilesBase64Service,
    private _cartaPublicacionService: CartaPublicacionService,
    private _articulosService: ArticulosService,
    private router: Router
    ) {
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
    });
   }

  ngOnInit(): void {
  }

  async subirFormato(){
    var fileInput = (<HTMLInputElement>document.getElementById("formatoCarga")).files[0];
    if(!fileInput){
      this.textErrorFormato = 'Adjunte el documento pdf';
      return;      
    }
    let documento = new DocumentoUploadModel();
    documento.nombre = "FORMATO_PUBLICACION";
    documento.extension =  this._utilesBase64Service.identificaTipoDocumento(fileInput.name); 
    var base =  await this._utilesBase64Service.baseTo64File(fileInput)
    documento.base64 = String(base);
    console.log(documento);
    this._cartaPublicacionService.guardarCartaPublicacion(this.idArticulo, documento).subscribe(resp =>{
      if(resp && resp.ubicacion){
        this.actualizarEstadoArticulo();
      }
      console.log(resp);
    });
  }

  actualizarEstadoArticulo(){
    this._articulosService.actualizarEstadoArticulo(this.idArticulo, "ESPERA_PUBLICACION_CORDINACION").subscribe(resp => {
      if(resp){
        Swal.fire({title:'Exitoso',type: 'success', text: 'Carta adjunta correctamente, espera a la publicación por parte de la coordinación'}).then(resp => {
          this.router.navigateByUrl("/listarArticulos");
        });
      }
    });
  }

}
