import { UsuarioModel } from './../../../../models/usuario.model';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { ComentarioGeneralService } from './../../../../servicios/comentariogeneral.service';
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
    private _comentarioGeneralService: ComentarioGeneralService,
    private _formatoIdeaService: FormatoIdeaService,
    private _usuarioService: UsuarioService
  ) {
    this.idea = new IdeaModel();
    this.uploadFormatoIdea = new UploadFormatoIdea();
    this.activatedRoute.params.subscribe((params) => {
      this.idIdea = Number(params["id"]);
      this.buscaIdeaById();
      this.buscarComentariosRechazo();
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
      this.downloadPdf(resp.document, resp.nombre);
    });
  }

  async  cargarDocumento() {
    var fileInput = (<HTMLInputElement>document.getElementById("archivoCarga")).files[0];
    if(!fileInput){
      this.textError = 'Adjunte el documento pdf';
      return;      
    }
    var base =  await this.baseTo64File(fileInput)
    this.uploadFormatoIdea.base64 = String(base);
    this.uploadFormatoIdea.idIdea = this.idIdea;
    this.uploadFormatoIdea.formato = "AUTORIZACION_ARTICULO";
    this._formatoIdeaService.insertaFormatoIdea(this.uploadFormatoIdea).subscribe(resp => {
      Swal.fire({
        allowOutsideClick: false,
        type: "success",
        text: "Formato cargado correctamente"
      }).then( (result) => {
        if(result){
          this.router.navigateByUrl('/listaIdeas');
        }
      });
    }, catchError => {
      Swal.fire({
        allowOutsideClick: false,
        type: "error",
        text: "Error al cargar el formato"
      });      
    });
  }

  baseTo64File(file){
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  }

  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.docx`;
    link.click();
  }

  buscarComentariosRechazo(){
    this._comentarioGeneralService.consultaComentariosByLlaveAndType(this.idIdea,'RECHAZO_FORMATO_IDEA').subscribe( resp => {
      this.comentarioGeneral = resp;
      //Buscamos el nombre del profesor
      if(this.comentarioGeneral){
        this.comentarioGeneral.forEach(item => {
          this._usuarioService.obtenerUsuariosById(item.id_usuario).subscribe( resp => {
            let usuario = new UsuarioModel();
            usuario = usuario.of(resp);
            item.nombreProfesor = usuario.nombre;
          });
        });
      }
    }); 
  }
}