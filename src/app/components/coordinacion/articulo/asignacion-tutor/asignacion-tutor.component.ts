import { UtilesBase64Service } from './../../../../servicios/utilesBase64.service';
import { DocumentDownload } from './../../../../models/DocumentDownload.model';
import { DownloadService } from './../../../../servicios/download.service';
import { ArticuloModel } from './../../../../models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { DibujaProcesoComponent } from './../../../general/dibuja-proceso/dibuja-proceso.component';
import { Router } from '@angular/router';
import { IdeaModel } from 'src/app/models/idea.model';
import { IdeaService } from 'src/app/servicios/idea.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
    private _downloadFiles: DownloadService,
    private _utilesBase64Service: UtilesBase64Service
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

  verCarta(urlCarta: string){
    console.log(urlCarta)
    let documento = new DocumentDownload();
    documento.ubicacion = urlCarta;

    this._downloadFiles.getDocumentByUbicacion(documento).subscribe( resp => {
      if(resp){
        resp.nombre = "carta.pdf";
        this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
      }
    });
  }

  publicarArticulo(idArt: number){
    this._articulosService.actualizarEstadoArticulo(idArt, "PUBLICADO").subscribe( resp => {
      if(resp){
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: 'Articulo publicado de forma correcta'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/publico');
          }
        });
      }
    });
  }

}
