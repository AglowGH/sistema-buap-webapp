import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';

declare var $:any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit{

  @Input() rol:string = "";
  @Input() datos_user:any = {};
  
  public admin:any = {};
  public errors:any = {};
  public editar:boolean = false;
  public hide_1:boolean = false;
  public hide_2:boolean = false;
  public inputType_1:string = "";
  public inputType_2:string = "";
  public token:string = "";

  constructor(
    private administradoresService:AdministradoresService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.admin = this.administradoresService.esquemaAdmin();
  }

  public showPassword(){
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar(){
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar(){

  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    //Validar la contraseña
    if(this.admin.password == this.admin.confirmar_password){
      //Registrar usuario
      this.administradoresService.registrarAdmin(this.admin).subscribe(
        (response)=>{
          //success
          alert("Usuario registrado correctamente");
          console.log("USUARIO REGISTRADO: ",response);
          if(this.token != ""){
            this.router.navigate(['home']);
          }else{
            this.router.navigate(["/"]);
          }
        },(error)=>{
          //Something's wrong
          alert("No se pudo registrar al usuario");
        }
      );
      

    }else{
      alert("Las contraseñas no coinciden");
      this.admin.password="";
      this.admin.confirmar_password="";
    }
  }

  public actualizar(){

  }
}
