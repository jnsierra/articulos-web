import { DibujaProcesoComponent } from './../../../general/dibuja-proceso/dibuja-proceso.component';
import { ActivatedRoute } from '@angular/router';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item-art',
  templateUrl: './item-art.component.html',
  styleUrls: ['./item-art.component.css']
})
export class ItemArtComponent implements OnInit {

  @Input()
  articulo:ArticuloModel;
  @Input()
  alumno:boolean;

  constructor(private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
  }

  verFlujo(id: number){
    const dialogRef = this.dialog.open(DibujaProcesoComponent, {data:{idIdea: id}});
  }

}
