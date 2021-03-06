import { UtilesBase64Service } from './../../../../servicios/utilesBase64.service';
import { ComentarioGeneralModel } from './../../../../models/comentariogeneral.model';
import { FormatoIdeaService } from './../../../../servicios/formatoIdea.service';
import { UploadFormatoIdea } from "./../../../../models/uploadformatoidea.model";

import { DownloadService } from "./../../../../servicios/download.service";
import { IdeaModel } from "./../../../../models/idea.model";
import { AuthService } from "./../../../../servicios/auth.service";
import { IdeaService } from "./../../../../servicios/idea.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import * as _ from "lodash";

@Component({
  selector: "app-cargarformato",
  templateUrl: "./cargarformato.component.html",
  styleUrls: [],
})
export class CargarformatoComponent implements OnInit {
  idIdea: number;
  idea: IdeaModel;
  textError: string;
  fileBase64: string;
  uploadFormatoIdea: UploadFormatoIdea;
  comentarioGeneral: ComentarioGeneralModel[];

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ideaService: IdeaService,
    private _authService: AuthService,
    private _downloadService: DownloadService,
    private router: Router,
    private _formatoIdeaService: FormatoIdeaService,
    private _utilesBase64Service: UtilesBase64Service
  ) {
    this.idea = new IdeaModel();
    this.uploadFormatoIdea = new UploadFormatoIdea();
    this.activatedRoute.params.subscribe((params) => {
      this.idIdea = Number(params["id"]);
      this.buscaIdeaById();
    });
  }

  buscaIdeaById() {
    this._ideaService.obtenerIdeaById(this.idIdea).subscribe(
      (resp) => {
        this.idea = this.idea.of(resp);
      },
      (catchError) => {
        if (catchError.status == 403) {
          console.log("Problema con el estado 403");
          Swal.fire({
            allowOutsideClick: false,
            type: "error",
            text: "Error de autenticacion por favor ingrese de nuevo"
          }).then((result) => {
            if (result.value) {
              this._authService.logout();
              this.router.navigateByUrl("/login");
            }
          });
        }
      }
    );
  }

  ngOnInit(): void {}

  descargarFormato() {
    this._downloadService.getFormatoIdea().subscribe((resp) => {
      if(resp){
        this._utilesBase64Service.downloadPdf(resp.document, resp.nombre);
      }else{
        Swal.fire('Error','Error formato no encontrado, contacte al administrador', 'error');
      }
    });
  }

  async  cargarDocumento() {
    var fileInput = (<HTMLInputElement>document.getElementById("archivoCarga")).files[0];
    if(!fileInput){
      this.textError = 'Adjunte el documento pdf';
      return;      
    }
    var base =  await this._utilesBase64Service.baseTo64File(fileInput)
    this.uploadFormatoIdea.base64 = String(base);
    this.uploadFormatoIdea.idIdea = this.idIdea;
    this.uploadFormatoIdea.formato = "PROCESO_AUT_TUTOR";
    this.uploadFormatoIdea.tipo = this._utilesBase64Service.identificaTipoDocumento(fileInput.name);
    this._formatoIdeaService.insertaFormatoIdea(this.uploadFormatoIdea).subscribe(resp => {
      if(resp){
        Swal.fire({
          allowOutsideClick: false,
          type: "success",
          text: "Formato cargado correctamente"
        }).then( (result) => {
          if(result){
            this.router.navigateByUrl('/listaIdeas');
          }
        });
      }else{
        Swal.fire({
          allowOutsideClick: false,
          type: "error",
          text: "Error al cargar el formato, contacte al administrador"
        }).then( (result) => {
          if(result){
            this.router.navigateByUrl('/listaIdeas');
          }
        });
      }
    }, catchError => {
      Swal.fire({
        allowOutsideClick: false,
        type: "error",
        text: "Error al cargar el formato"
      });      
    });
  }
  
}