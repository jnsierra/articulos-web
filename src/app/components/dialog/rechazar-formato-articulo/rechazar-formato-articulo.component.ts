import { RechazoFormatoArticuloModel } from './../../../models/rechazoformatoarticulomodel.model';
import { RevisionFormatoComponent } from './../../profesor/articulo/revision-formato/revision-formato.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rechazar-formato-articulo',
  templateUrl: './rechazar-formato-articulo.component.html',
  styleUrls: ['./rechazar-formato-articulo.component.css']
})
export class RechazarFormatoArticuloComponent implements OnInit {

  mensaje:boolean;

  constructor(private dialogRef: MatDialogRef<RevisionFormatoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RechazoFormatoArticuloModel ) {
      this.data = new RechazoFormatoArticuloModel();
      this.mensaje = false;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  } 

  enviarComentario(){
    if(this.data.comentario && this.data.comentario != ''){
      this.dialogRef.close();
    }
    this.mensaje = true;
  }

}
