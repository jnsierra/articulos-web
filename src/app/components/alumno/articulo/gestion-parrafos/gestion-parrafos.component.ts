import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-parrafos',
  templateUrl: './gestion-parrafos.component.html',
  styleUrls: ['./gestion-parrafos.component.css']
})
export class GestionParrafosComponent implements OnInit {

  idArticulo: Number;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      console.log("Este es el id art: ",  this.idArticulo);
    });
  }

  ngOnInit(): void {
  }

}
