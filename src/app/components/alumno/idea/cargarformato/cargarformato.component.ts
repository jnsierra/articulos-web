import { DownloadService } from './../../../../servicios/download.service';
import { IdeaModel } from './../../../../models/idea.model';
import { AuthService } from './../../../../servicios/auth.service';
import { IdeaService } from './../../../../servicios/idea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargarformato',
  templateUrl: './cargarformato.component.html',
  styleUrls: []
})
export class CargarformatoComponent implements OnInit {

  idIdea:number;
  idea:IdeaModel;

  constructor(private activatedRoute: ActivatedRoute,
              private _ideaService: IdeaService,
              private _authService: AuthService,
              private _downloadService: DownloadService,
              private router: Router) {
    this.idea = new IdeaModel();

    this.activatedRoute.params.subscribe(params => {
      this.idIdea = Number(params['id']);
      this.buscaIdeaById();
    }); 
   }

   buscaIdeaById() {
    this._ideaService.obtenerIdeaById(this.idIdea).subscribe(resp => {
      this.idea = this.idea.of(resp);
    }, catchError => {
      if (catchError.status == 403) {
        console.log('Problema con el estado 403');
        Swal.fire({
          allowOutsideClick: false,
          type: 'error',
          text: 'Error de autenticacion por favor ingrese de nuevo'
        }).then((result) => {
          if (result.value) {
            this._authService.logout();
            this.router.navigateByUrl('/login');
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  descargarFormato(){
    this._downloadService.getFormatoIdea().subscribe(resp => {
      this.downloadPdf(resp.document, resp.nombre);
    });
  }

  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.docx`
    link.click();
  }
}