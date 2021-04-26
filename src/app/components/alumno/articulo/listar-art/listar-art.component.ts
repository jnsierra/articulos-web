import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { ArticulosService } from 'src/app/servicios/articulos.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-art',
  templateUrl: './listar-art.component.html',
  styleUrls: ['./listar-art.component.css']
})
export class ListarArtComponent implements OnInit {

  usuario;
  articulos: ArticuloModel[];

  constructor(private _articuloService: ArticulosService
    ,private _authService: AuthService
    ,private router: Router) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this._articuloService.consultarArticulosByUsuario(this.usuario.id).subscribe(resp =>{
      this.articulos = resp;
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
      });
  }

}
