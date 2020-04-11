import { UploadService } from './../../../servicios/upload.service';
import { ArticuloModel } from './../../../models/articulo.model';
import { ArticulosService } from './../../../servicios/articulos.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadArticulo } from 'src/app/models/uploadarticulo.model';

@Component({
  selector: 'app-subirpdflist',
  templateUrl: './subirpdflist.component.html',
  styleUrls: ['./subirpdflist.component.css']
})
export class SubirpdflistComponent implements OnInit {

  usuario;
  articulos: ArticuloModel[];

  constructor(private _articuloService: ArticulosService,
              private _uploadService: UploadService) {
    this.articulos = new Array();
    this.buscaArticulosByAlumno();
  }

  ngOnInit() {
  }

  buscaArticulosByAlumno() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this._articuloService.consultaArticulosAlumnoAprobados(this.usuario.id).subscribe(resp => {
      this.articulos = new ArticuloModel().ofListView(resp);
    });
  }

  cargarPdf(idArticulo: number) {
    console.log('Nicolas');
    Swal.fire({
      title: 'Seleccione el articulo',
      text: 'EL artículo debe estar en pdf',
      input: 'file',
      inputAttributes: {
        'accept': '.pdf',
        'aria-label': 'Upload your profile picture'
      }
    }).then(resp => {
      const { value: file } = resp;
      if (file) {
        this.getBase64(file).then( data => {
          this.persisteArticulo(String( data ), idArticulo);
        });
      }
    });
  }

  getBase64(file){
    return new Promise(function ( resolve, reject ){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  persisteArticulo(base64: string, idArticulo: number){
    const uploadArt = new UploadArticulo();
    uploadArt.idArticulo = idArticulo;
    uploadArt.base64 = base64;
    this._uploadService.uploadFile(uploadArt).subscribe(resp => {
      if(resp){
        Swal.close();
        Swal.fire({
          type: 'success',
          title: 'CARGUE',
          text: 'Cargue exitoso'
        }).then( resp => {this.buscaArticulosByAlumno()} );
      }
     });
  }
}
