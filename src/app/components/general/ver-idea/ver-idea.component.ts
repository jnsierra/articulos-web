import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { IdeaService } from 'src/app/servicios/idea.service';
import { IdeaModel } from 'src/app/models/idea.model';
import { Component, Input, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-ver-idea',
  templateUrl: './ver-idea.component.html',
  styleUrls: ['./ver-idea.component.css']
})
export class VerIdeaComponent implements OnInit {

  @Input()
  idIdea: number;
  idea: IdeaModel = new IdeaModel();

  constructor(private _ideaService: IdeaService,
    private _authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.buscaIdeaById();
  }

  buscaIdeaById() {
    this._ideaService.obtenerIdeaById(this.idIdea).subscribe((resp) => {
        this.idea = this.idea.ofWithIdProf(resp);
      },
      (catchError) => {
        if (catchError.status == 403) {
          console.log("Problema con el estado 403");
          Swal.fire({
            allowOutsideClick: false,
            type: "error",
            text: "Error de autenticacion por favor ingrese de nuevo"
          }).then((result) => {
            if (result.value) {
              this._authService.logout();
              this.router.navigateByUrl("/login");
            }
          });
        }
      }
    );
  }

}
