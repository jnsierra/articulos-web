import { ComentarioArticuloService } from './../../../servicios/comentarioarticulo.service';
import { ComentarioArticuloModel } from './../../../models/comentarioarticulo.model';
import { NgForm } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-comment-profesor',
  templateUrl: './add-comment-profesor.component.html',
  styleUrls: ['./add-comment-profesor.component.css']
})
export class AddCommentProfesorComponent implements OnInit {
  
  comentario:ComentarioArticuloModel;

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddCommentProfesorComponent>,
              private _comentarioArticuloService: ComentarioArticuloService
  ) {
    this.comentario = new ComentarioArticuloModel();
    if(data){
      this.comentario.idArticulo = data.idArt;
      this.comentario.typeComentarioArt = data.type;
      this.comentario.historico = data.historico;
      this.comentario.idUsuario = data.idUsuario;
    }
  }

  ngOnInit(): void {
  }

  ingresarComentario(f:NgForm){
    if(f.invalid){
      return ;
    }
    this._comentarioArticuloService.insertarComentario(this.comentario).subscribe( resp => {
      if(resp){
        Swal.fire({
          allowOutsideClick: false,
          type: 'success',
          text: 'Comentario insertado correctamente'
        }).then((result) => {
          if (result.value) {
            this.dialogRef.close({creaCom: true, typeComentarioArt: this.comentario.typeComentarioArt});
          }
        });
      }
    });
  }

}
