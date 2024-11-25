import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-materias-screen',
  templateUrl: './registro-materias-screen.component.html',
  styleUrls: ['./registro-materias-screen.component.scss']
})
export class RegistroMateriasScreenComponent implements OnInit{

  @Input() datos_materia:any = {};
  public editar:boolean = false;

  public materia:any = {};
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
    {value: '6', viewValue: 'Sabado'},
    {value: '7', viewValue: 'Domingo'},
  ];

  ngOnInit(): void {
    
  }

  constructor(
    private location:Location
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

  public registrar(){}

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
