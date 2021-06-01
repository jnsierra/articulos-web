import { DibujaProcesoComponent } from './../../../general/dibuja-proceso/dibuja-proceso.component';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  idArticulo:number;
  articulo: ArticuloModel; 

  constructor(private activatedRoute: ActivatedRoute,
    private _articuloService: ArticulosService,
    private _authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      this.consultaArticulo();
    });
  }

  ngOnInit(): void {
    this.articulo = new ArticuloModel();

  }

  consultaArticulo(){
    this._articuloService.consultaArticuloById(this.idArticulo).subscribe(resp =>{
      this.articulo = this.articulo.of(resp);
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
    })
  }

  actualizarArticulo(f: NgForm){
    if(f.invalid){
      return ;
    }
    this._articuloService.actualizarArticulo(this.articulo).subscribe(resp => {
      if(resp){
        Swal.fire({
          title: 'Actualizado',
          text: 'Artículo actualizado con exito.',
          type: 'success'
        });
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Error al actualizar el articulo',
          type: 'error'
        });
      }
    });

  }

  verFlujo(){
    const dialogRef = this.dialog.open(DibujaProcesoComponent, {data:{idIdea: this.articulo.ideaId}});
  }

  actualizarEstadoArticulo(){
    this._articuloService.enviarRevisionArticulo(this.articulo.id).subscribe(resp => {
      this.validaRespuesta(resp);
    });
    
  }

  validaRespuesta(resp: any){
    if(resp && resp.status === 'error'){
      Swal.fire(
        "Mensaje",
        resp.message,
        "error");

    }else{
      Swal.fire(
        "Enviado",
         "Enviado al profesor",
        "success").then(resp => {
          this.router.navigate(['/listarArticulos']);
      });
    }
  }

}