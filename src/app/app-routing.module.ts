import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroUsuarioScreenComponent } from './screens/registro-usuario-screen/registro-usuario-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { RegistroMateriasScreenComponent } from './screens/registro-materias-screen/registro-materias-screen.component';
import { ListaMateriasScreenComponent } from './screens/lista-materias-screen/lista-materias-screen.component';


const routes: Routes = [
  {path:'',component:LoginScreenComponent,pathMatch:'full'},
  {path:'registro-usuarios',component:RegistroUsuarioScreenComponent,pathMatch:'full'},
  { path: 'registro-usuarios/:rol/:id', component: RegistroUsuarioScreenComponent, pathMatch: 'full' },
  {path:'home',component:HomeScreenComponent,pathMatch:'full'},
  { path: 'administrador', component: AdminScreenComponent, pathMatch: 'full' },
  { path: 'alumnos', component: AlumnosScreenComponent, pathMatch: 'full' },
  { path: 'maestros', component: MaestrosScreenComponent, pathMatch: 'full' },
  { path: 'graficas', component: GraficasScreenComponent, pathMatch: 'full' },
  {path:'registro-materias',component:RegistroMateriasScreenComponent,pathMatch:'full'},
  {path:'lista-materias',component:ListaMateriasScreenComponent,pathMatch:'full'},
  {path:'registro-materias/:nrc',component:RegistroMateriasScreenComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
