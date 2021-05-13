import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-vistaprevia',
  templateUrl: './gestion-vistaprevia.component.html',
  styleUrls: ['./gestion-vistaprevia.component.css']
})
export class GestionVistapreviaComponent implements OnInit {

  idArticulo: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
      console.log(this.idArticulo);
    });
  }

  ngOnInit(): void {
  }

}
