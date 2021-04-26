import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
//Interceptores
import { AuthInterceptorService } from './servicios/auth-interceptor.service';
//Importaciones de Material
import { MatCheckboxModule} from '@angular/material/checkbox' 
import {MatMenuModule} from '@angular/material/menu' 
import {MatIconModule} from '@angular/material/icon' 
import {MatTableModule} from '@angular/material/table' 
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';

//Rutas
import { APP_ROUTING } from './app.routes';
//Componentes personalizados
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { LoginComponent } from './components/share/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PublicoComponent } from './components/publico/publico.component';
import { RegistrarseComponent } from './components/share/registrarse/registrarse.component';
import { AutorizarusuariosComponent } from './components/admin/autorizarusuarios/autorizarusuarios.component';
import { ActusuarioComponent } from './components/admin/actusuario/actusuario.component';
import { CrearideaComponent } from './components/alumno/idea/crearidea/crearidea.component';
import { ListaideasComponent } from './components/alumno/idea/listaideas/listaideas.component';
import { ListaideasProfComponent } from './components/profesor/listaideas/listaideas.component';
import { NavbaralumnoComponent } from './components/share/navbaralumno/navbaralumno.component';
import { NavbaradminComponent } from './components/share/navbaradmin/navbaradmin.component';
import { NavbarprofesorComponent } from './components/share/navbarprofesor/navbarprofesor.component';
import { ArticuloindividualComponent } from './components/alumno/articuloindividual/articuloindividual.component';
import { CorreccionarticuloComponent } from './components/alumno/correccionarticulo/correccionarticulo.component';
import { AutorizararticuloComponent } from './components/profesor/autorizararticulo/autorizararticulo.component';
import { SubirpdfComponent } from './components/alumno/subirpdf/subirpdf.component';
import { SubirpdflistComponent } from './components/alumno/subirpdflist/subirpdflist.component';
import { from } from 'rxjs';
import { ActualizarComponent } from './components/alumno/idea/actualizar/actualizar.component';
import { CargarformatoComponent } from './components/alumno/idea/cargarformato/cargarformato.component';
import { AprobarformatoComponent } from './components/profesor/idea/aprobarformato/aprobarformato.component';
import { ComentariosComponent } from './components/general/comentarios/comentarios.component';
import { VerIdeaComponent } from './components/general/ver-idea/ver-idea.component';
import { ProfesoresIdeaComponent } from './components/general/profesores-idea/profesores-idea.component';
import { ListarArtComponent } from './components/alumno/articulo/listar-art/listar-art.component';
import { ItemArtComponent } from './components/alumno/articulo/item-art/item-art.component';
import { CrearArticuloComponent } from './components/alumno/articulo/crear-articulo/crear-articulo.component';
import { VerIdeaArticuloComponent } from './components/alumno/articulo/ver-idea-articulo/ver-idea-articulo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    PublicoComponent,
    RegistrarseComponent,
    AutorizarusuariosComponent,
    ActusuarioComponent,
    CrearideaComponent,
    ListaideasComponent,
    ListaideasProfComponent,
    NavbaralumnoComponent,
    NavbaradminComponent,
    NavbarprofesorComponent,
    ArticuloindividualComponent,
    CorreccionarticuloComponent,
    AutorizararticuloComponent,
    SubirpdfComponent,
    SubirpdflistComponent,
    ActualizarComponent,
    CargarformatoComponent,
    AprobarformatoComponent,
    ComentariosComponent,
    VerIdeaComponent,
    ProfesoresIdeaComponent,
    ListarArtComponent,
    ItemArtComponent,
    CrearArticuloComponent,
    VerIdeaArticuloComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatCheckboxModule, 
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    APP_ROUTING
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
