import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/servicios/articulos.service';

@Component({
  selector: 'app-revision-formato',
  templateUrl: './revision-formato.component.html',
  styleUrls: ['./revision-formato.component.css']
})
export class RevisionFormatoComponent implements OnInit {

  idArticulo: number;

  constructor(private activatedRoute: ActivatedRoute,
    private _articulosService: ArticulosService) {
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      this.buscaArticulo();
      console.log("Id Articulo", this.idArticulo);
    });
   }

  ngOnInit(): void {
  }

  buscaArticulo(){
    this._articulosService.consultaArticuloById(this.idArticulo).subscribe(resp => {
      if(resp){
        console.log(resp);
      }
    });
  }

}