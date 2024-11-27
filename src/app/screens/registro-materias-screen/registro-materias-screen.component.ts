import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

declare var $:any;

@Component({
  selector: 'app-registro-materias-screen',
  templateUrl: './registro-materias-screen.component.html',
  styleUrls: ['./registro-materias-screen.component.scss']
})
export class RegistroMateriasScreenComponent implements OnInit{

  @Input() rol:string = "";
  @Input() datos_materia:any = {};
  public editar:boolean = false;
  public hora_inicio:any = { hour: 13, minute: 30 };
  public hora_fin:any = { hour: 13, minute: 30 };
  public tipo:string = "";
  public error:any=[];
  public token:string = "";

  public materia:any = {
    dias:[]
  };
  public errors:any = {};
  
  public carreras:any = [
    {value: '1', viewValue: 'Ingeniería en Ciencias de la Computación'},
    {value: '2', viewValue: 'Licenciatura en Ciencias de la Computación'},
    {value: '3', viewValue: 'Ingeniería en Tecnologías de la Información'}
  ];

  public profesores:any = [
    {value: '1', viewValue: 'Profesor Jirafales'},
    {value: '2', viewValue: 'Doctor Chapatin'}
  ];

  public dias:any = [
    {value: '1', viewValue: 'Lunes'},
    {value: '2', viewValue: 'Martes'},
    {value: '3', viewValue: 'Miercoles'},
    {value: '4', viewValue: 'Jueves'},
    {value: '5', viewValue: 'Viernes'},
    {value: '6', viewValue: 'Sabado'}
  ];

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    this.materia.rol = this.rol;
    this.token = this.facadeService.getSessionToken();
  }

  constructor(
    private router: Router,
    private location:Location,
    private facadeService: FacadeService,
    private materiasService:MateriasService
  ){}

  public checkboxChange(event:any){
    console.log("Evento: ", event);
    if(event.checked){
      this.materia.dias.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.dias.forEach((dia, i) => {
        if(dia == event.source.value){
          this.materia.dias.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.materia);
  }

  public revisarSeleccion(nombre: string){
    if(this.materia.dias){
      var busqueda = this.materia.dias.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }


  public regresar(){
    this.location.back();
  }

  public actualizar(){}

  public registrar(){
    this.materia['hora_inicio'] = this.hora_inicio.hour;
    this.materia['hora_fin'] = this.hora_fin.hour;
    this.materia['minuto_inicio'] = this.hora_inicio.minute;
    this.materia['minuto_fin'] = this.hora_inicio.minute;
    this.errors = this.materiasService.validarMateria(this.materia);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    this.materiasService.registrarMateria(this.materia).subscribe(
      (response)=>{
        alert("Matera registrado de manera correcta");
        console.log(response);
        this.router.navigate(['home']);
      },(error)=>{
        alert("No se pudo registrar la materia");
        console.log(error);
      }
    );
    console.log(this.materia);

  }

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

  public soloLetrasYNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32  &&                       // Espacio
      !(charCode >= 48 && charCode <= 57) 
    ) {
      event.preventDefault();
    }
  }

}
