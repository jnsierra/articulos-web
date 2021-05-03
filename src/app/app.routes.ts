import { CorregirIdeaJuradoComponent } from './components/alumno/idea/corregir-idea-jurado/corregir-idea-jurado.component';
import { RevisionideaComponent } from './components/profesor/jurado/revisionidea/revisionidea.component';
import { AsignarJuradoComponent } from './components/coordinacion/idea/asignar-jurado/asignar-jurado.component';
import { AsignacionTutorComponent } from './components/coordinacion/articulo/asignacion-tutor/asignacion-tutor.component';
import { GestionParrafosComponent } from './components/alumno/articulo/gestion-parrafos/gestion-parrafos.component';
import { GestionLecturaComponent } from './components/alumno/articulo/gestion-lectura/gestion-lectura.component';
import { VerIdeaArticuloComponent } from './components/alumno/articulo/ver-idea-articulo/ver-idea-articulo.component';
import { VerIdeaComponent } from './components/general/ver-idea/ver-idea.component';
import { CrearArticuloComponent } from './components/alumno/articulo/crear-articulo/crear-articulo.component';
import { ListarArtComponent } from './components/alumno/articulo/listar-art/listar-art.component';
import { AprobarformatoComponent } from './components/profesor/idea/aprobarformato/aprobarformato.component';
import { AutorizararticuloComponent } from './components/profesor/autorizararticulo/autorizararticulo.component';
import { RouterModule, Routes } from '@angular/router';
//Guards (Interceptores previos a la renderizacion de la pagina)
import { AuthGuard } from './components/guards/auth.guard';
//Componentes publicos
import { LoginComponent} from './components/share/login/login.component';
import { PublicoComponent } from './components/publico/publico.component';
import { RegistrarseComponent } from './components/share/registrarse/registrarse.component';
//Componentes propios generales
import { HomeComponent } from './components/home/home.component';
//Componentes para admin
import { AutorizarusuariosComponent } from './components/admin/autorizarusuarios/autorizarusuarios.component';
import { ActusuarioComponent } from './components/admin/actusuario/actusuario.component';
//Componentes para alumno
import { CrearideaComponent } from './components/alumno/idea/crearidea/crearidea.component'
import { ListaideasComponent } from './components/alumno/idea/listaideas/listaideas.component';
import { ArticuloindividualComponent } from './components/alumno/articuloindividual/articuloindividual.component';
import { SubirpdfComponent } from './components/alumno/subirpdf/subirpdf.component';
import { SubirpdflistComponent } from './components/alumno/subirpdflist/subirpdflist.component';
import { CargarformatoComponent } from './components/alumno/idea/cargarformato/cargarformato.component';
//Componentes para profesor
import { ListaideasProfComponent } from './components/profesor/listaideas/listaideas.component';
import { ActualizarComponent } from './components/alumno/idea/actualizar/actualizar.component';

const APP_ROUTERS: Routes = [
    { path: 'publico', component: PublicoComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'admAuUsuario', component: AutorizarusuariosComponent, canActivate: [AuthGuard] },
    { path: 'actUsuario/:id', component: ActusuarioComponent, canActivate: [AuthGuard] },
    { path: 'crearIdea', component: CrearideaComponent, canActivate: [AuthGuard] },
    { path: 'actualizarIdea/:id', component: ActualizarComponent, canActivate: [AuthGuard]},
    { path: 'articuloAlumn/:id', component: ArticuloindividualComponent, canActivate: [AuthGuard] },
    //Alumno
    { path: 'cargarFormato/:id', component: CargarformatoComponent, canActivate: [AuthGuard] },
    { path: 'listarArticulos', component: ListarArtComponent, canActivate: [AuthGuard] },
    { path: 'articuloProf/:id' , component: AutorizararticuloComponent, canActivate: [AuthGuard] },
    { path: 'listaIdeas', component: ListaideasComponent, canActivate: [AuthGuard] },
    { path: 'listaIdeasProf', component: ListaideasProfComponent, canActivate: [AuthGuard] },
    { path: 'subirPdfAlumnoList', component: SubirpdflistComponent, canActivate: [AuthGuard] },
    { path: 'subirPdfAlumno/:id', component: SubirpdfComponent, canActivate: [AuthGuard] },
    { path: 'editarArticulo/:id', component: CrearArticuloComponent, canActivate: [AuthGuard] },
    { path: 'verIdeaArticulo/:id/:idArticulo', component: VerIdeaArticuloComponent, canActivate: [AuthGuard] },
    { path: 'verControlLectura/:id', component: GestionLecturaComponent, canActivate: [AuthGuard] },
    { path: 'verParrafos/:id', component: GestionParrafosComponent, canActivate: [AuthGuard] },
    { path: 'correccionIdeaJuradoAlumno/:id', component: CorregirIdeaJuradoComponent, canActivate: [AuthGuard] },
    //Coordinacion
    { path: 'asignacionTutor', component: AsignacionTutorComponent, canActivate: [AuthGuard] },
    { path: 'asignacionTutorIdea/:id', component: AsignarJuradoComponent, canActivate: [AuthGuard] },
    //Profesores
    { path: 'aprobarFormatoIdea/:id', component: AprobarformatoComponent, canActivate: [AuthGuard] },
    { path: 'revisionIdeaJurado/:id', component: RevisionideaComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'login'} 
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTERS, { useHash: true, relativeLinkResolution: 'legacy' } );