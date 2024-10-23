import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';

declare var $:any;

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit{
  @Input() rol:string = "";
  @Input() datos_user:any = {};

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public alumno:any= {};
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  public token:string = "";


  constructor(
    //private location : Location,
    private router: Router,
    //public activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ){}

  ngOnInit(): void {
    this.alumno = this.alumnosService.esquemaAlumno();
    this.alumno.rol = this.rol;
  }

  public regresar(){
    
  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event:any){
    console.log(event);
    console.log(event.value.toISOString());

    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.alumno.fecha_nacimiento);
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    //Validar Password
    if(this.alumno.password == this.alumno.confirmar_password){
      //Registrar alumno
      this.alumnosService.registrarAlumno(this.alumno).subscribe(
        (response)=>{
          //success
          alert("Alumno registrado correctamente");
          console.log("ALUMNO REGISTRADO: ",response);
          if(this.token != ""){
            this.router.navigate(['home']);
          }else{
            this.router.navigate(["/"]);
          }
        },(error)=>{
          //Something's wrong
          alert("No se pudo registrar al alumno");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.alumno.password="";
      this.alumno.confirmar_password="";
    }

  }

  public actualizar(){

  }

}
