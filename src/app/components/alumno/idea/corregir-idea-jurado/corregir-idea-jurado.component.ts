import { FormatoIdeaService } from './../../../../servicios/formatoIdea.service';
import { UploadFormatoIdea } from './../../../../models/uploadformatoidea.model';
import { UtilesBase64Service } from './../../../../servicios/utilesBase64.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corregir-idea-jurado',
  templateUrl: './corregir-idea-jurado.component.html',
  styleUrls: ['./corregir-idea-jurado.component.css']
})
export class CorregirIdeaJuradoComponent implements OnInit {

  idIdea: number;
  textError: string;
  uploadFormatoIdea: UploadFormatoIdea;
  

  constructor(private activatedRoute: ActivatedRoute,
              private _utilesBase64Service: UtilesBase64Service,
              private router: Router,
              private _formatoIdeaService: FormatoIdeaService) {
    this.uploadFormatoIdea = new UploadFormatoIdea();
    this.activatedRoute.params.subscribe(params => {
      this.idIdea = Number(params['id']);
    });
  }

  ngOnInit(): void {
  }

  async cargarFormato(){
    var fileInput = (<HTMLInputElement>document.getElementById("archivoCarga")).files[0];
    if(!fileInput){
      this.textError = 'Adjunte el documento pdf';
      return;      
    }
    var base =  await this._utilesBase64Service.baseTo64File(fileInput)
    this.uploadFormatoIdea.base64 = String(base);
    this.uploadFormatoIdea.idIdea = this.idIdea;
    this.uploadFormatoIdea.formato = "PROCESO_AUT_JURADO";
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
