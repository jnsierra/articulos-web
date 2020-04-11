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
import { MatCheckboxModule, 
  MatMenuModule, 
  MatIconModule, 
  MatTableModule, 
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule } from '@angular/material';
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
    SubirpdflistComponent
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
    APP_ROUTING
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
