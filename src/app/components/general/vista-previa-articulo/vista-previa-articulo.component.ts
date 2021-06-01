import { title } from 'process';
import { Router } from '@angular/router';
import { ComentarioArticuloModel } from './../../../models/comentarioarticulo.model';
import { ComentarioArticuloService } from './../../../servicios/comentarioarticulo.service';
import { AddCommentProfesorComponent } from './../add-comment-profesor/add-comment-profesor.component';
import { ParrafoModel } from './../../../models/parrafo.model';
import { ParrafoService } from './../../../servicios/parrafo.service';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-previa-articulo',
  templateUrl: './vista-previa-articulo.component.html',
  styleUrls: ['./vista-previa-articulo.component.css']
})
export class VistaPreviaArticuloComponent implements OnInit {

  @Input()
  idArticulo: number;
  @Input()
  alumno: boolean;

  articulo: ArticuloModel;
  parrafos: ParrafoModel[];
  usuario;
  comIntro: ComentarioArticuloModel[];
  comIntroVer: boolean;



  constructor(private _articuloService: ArticulosService,
    private dialog: MatDialog,
    private _comentarioArticuloService: ComentarioArticuloService,
    private router: Router,
    private _parrafoService: ParrafoService) {
    this.comIntroVer = false;
    this.articulo = new ArticuloModel();
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit(): void {
    this.buscaArticulo();
    this.buscarParrafos();
  }

  buscaArticulo() {
    this._articuloService.consultaArticuloById(this.idArticulo).subscribe(resp => {
      if (resp) {
        let art = new ArticuloModel();
        this.articulo = art.of(resp);
      }
    });
  }

  buscarParrafos() {
    this._parrafoService.getParrafosByArtId(this.idArticulo).subscribe(resp => {
      if (resp) {
        console.log('Estos son los parrafos: ', resp)
        this.parrafos = resp;
      }
    });
  }

  adicionarComentarioGeneral(typeComment: string, historico: string) {
    const dialogRef = this.dialog.open(AddCommentProfesorComponent,
      { data: { idArt: this.articulo.id, type: typeComment, historico: historico, idUsuario: this.usuario.id } });
      dialogRef.afterClosed().subscribe(result=>{
        if(result && result.creaCom){          
          this.verComentarios(result);
          console.log("Se debe consultar de nuevo: ", result);
        }
      });
  }

  responderComentario(idComentario: number, comentario: string){
    Swal.fire({
      title: 'RESPUESTA AL COMENTARIO: ',
      text: comentario,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Responder'
    }).then(resp =>{
      if(resp.value){
        let comentario = new ComentarioArticuloModel();
        comentario.id = idComentario;
        comentario.respuestaComentario = resp.value;
        this._comentarioArticuloService.responderComentario(comentario).subscribe(resp => {
          if(resp){
            Swal.fire({title: 'Respuesta', text: 'Respuesta actualizada correctamente', type: 'success'}).then(resp => {
              this.comIntroVer = false;
            });
          }
          console.log('ESta es la respuesta', resp);
        });
      }
    });
  }

  verComentarios(typeComment: string){
    if(!this.comIntroVer){
      this._comentarioArticuloService.consultaComentariosByArtAndType(this.articulo.id, typeComment).subscribe(resp => {
        if(resp){
          if('INTRODUCCION' === typeComment){
            this.comIntro = resp;
          }
        }
      });
    }
  }

  vistaNula(valor:string, mensajeNulo: string):string{
    if(valor){
      return valor;
    }
    return mensajeNulo;
  }

  enviarCorregirAlumno(){
    this._articuloService.actualizarEstadoArticulo(this.articulo.id, 'ENVIADO_POR_CORRECCIONES').subscribe(resp =>{
      if(resp){
        Swal.fire({
          title: 'Enviado a corregir correctamente',
          type: 'success'
        }).then(resp =>{
          this.router.navigateByUrl("/listaIdeasProf");

        });
      }
    });
  }

  enviarGenerarDocumento(){
    this._articuloService.aprobarRevisionArticulo(this.articulo.id).subscribe(resp => {
      if(resp){
        this.validarRespuesta(resp);
      }
    });
  }

  validarRespuesta(resp: any){
    if(resp.status === 'error'){
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: resp.message
      }); 
    }else{
      Swal.fire({
        type: 'success',
        title: 'Exito',
        text: 'Enviado a generar documento'
      }).then(resp =>{
        this.router.navigateByUrl("/listaIdeasProf");
      }); 
    }
  }
}