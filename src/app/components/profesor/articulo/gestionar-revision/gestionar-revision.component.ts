import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionar-revision',
  templateUrl: './gestionar-revision.component.html',
  styleUrls: ['./gestionar-revision.component.css']
})
export class GestionarRevisionComponent implements OnInit {

  idArticulo: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params =>{
      this.idArticulo = Number(params['id']);
    });
  }

  ngOnInit(): void {
  }

}
