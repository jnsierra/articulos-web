import { ActivatedRoute } from '@angular/router';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-art',
  templateUrl: './item-art.component.html',
  styleUrls: ['./item-art.component.css']
})
export class ItemArtComponent implements OnInit {

  @Input()
  articulo:ArticuloModel;

  constructor() {
    
  }

  ngOnInit(): void {
  }

}