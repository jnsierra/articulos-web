import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesores-idea',
  templateUrl: './profesores-idea.component.html',
  styleUrls: ['./profesores-idea.component.css']
})
export class ProfesoresIdeaComponent implements OnInit {

  @Input()
  profesorAsignado: string;
  @Input()
  profesorAutoriza: string;

  constructor() { }

  ngOnInit(): void {
  }

}
