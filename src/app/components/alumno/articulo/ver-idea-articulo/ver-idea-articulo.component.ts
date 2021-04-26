import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-idea-articulo',
  templateUrl: './ver-idea-articulo.component.html',
  styleUrls: ['./ver-idea-articulo.component.css']
})
export class VerIdeaArticuloComponent implements OnInit {

  idIdea: Number;
  idArticulo: Number;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params =>{
      this.idIdea = Number(params['id']);
      this.idArticulo = Number(params['idArticulo']);
      console.log("Art:",this.idArticulo);
      console.log("Idea:", this.idIdea);
    });
  }

  ngOnInit(): void {
  }

}
