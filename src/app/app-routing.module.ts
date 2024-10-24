import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroUsuarioScreenComponent } from './screens/registro-usuario-screen/registro-usuario-screen.component';


const routes: Routes = [
  {path:'',component:LoginScreenComponent,pathMatch:'full'},
  {path:'registro-usuarios',component:RegistroUsuarioScreenComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
