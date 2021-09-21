import { UsuarioService } from './../../../servicios/usuario.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetearpass',
  templateUrl: './resetearpass.component.html',
  styleUrls: ['./resetearpass.component.css']
})
export class ResetearpassComponent implements OnInit {

  correo:string;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  recuperarContrasenia(form: NgForm){
    if(form.invalid){
      return ;
    }
    this.usuarioService.recuperarContrasenia(this.correo).subscribe(resp => {
      console.log(resp);
    });
  }

}
