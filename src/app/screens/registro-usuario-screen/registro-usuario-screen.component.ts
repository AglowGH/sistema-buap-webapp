import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-registro-usuario-screen',
  templateUrl: './registro-usuario-screen.component.html',
  styleUrls: ['./registro-usuario-screen.component.scss']
})
export class RegistroUsuarioScreenComponent implements OnInit{

  public tipo:string = "registro-usuarios";
  public user:any = {};
  public editar:boolean = false;
  public isAdmin:boolean = false;
  public isAlumno:boolean = false;
  public isMaestro:boolean = false;
  public tipo_user:string = "";


  constructor(){

  }

  ngOnInit(): void {
    
  }

  public radioChange(event: MatRadioChange) {
    if(event.value == "administrador"){
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isAlumno = false;
      this.isMaestro = false;
    }else if (event.value == "alumno"){
      this.isAdmin = false;
      this.isAlumno = true;
      this.tipo_user = "alumno"
      this.isMaestro = false;
    }else if (event.value == "maestro"){
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true;
      this.tipo_user = "maestro"
    }
  }

}
