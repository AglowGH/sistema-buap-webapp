import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { MaestrosService } from 'src/app/services/maestros.service';

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

  public profesores:any = [];

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
    this.obtenerMaestros();
    if(this.activatedRoute.snapshot.params['nrc'] != undefined){
      this.editar=true;
      this.materia['nrc'] = this.activatedRoute.snapshot.params['nrc'];
      this.obtenerMateria(this.materia['nrc']);
    }
  }

  public obtenerMaestros(){
    this.maestrosService.obtenerListaMaestros().subscribe(
      (response)=>{
        let profesores:any = [];
        let i:number = 1;
        response.forEach((profesor)=>{
          profesores.push({value: `${i++}` , viewValue: `${profesor.user.first_name} ${profesor.user.last_name}`, id:profesor.id});
        });
        this.profesores=profesores;
      },(error)=>{
        console.log("La lista de profesores no se pudo recuperar.");
      }
    );
  }

  public obtenerMateria(nrc:any){
    this.materiasService.obtenerMateria(nrc).subscribe(
      (response)=>{
        this.materia['nombre'] = response['nombre'];
        this.materia['seccion'] = response['seccion'];
        this.materia['salon'] = response['salon'];
        this.materia['programa_educativo'] = response['programa_educativo'];
        this.materia['profesor_asignado'] = response['profesor_asignado'];
        this.materia['creditos'] = response['creditos'];
        this.hora_inicio = {hour:response['hora_inicio'],minute:response['minuto_inicio']}
        this.hora_fin = {hour:response['hora_fin'],minute:response['minuto_fin']}
        this.materia.dias = response['dias'];
      },(error)=>{
        console.log(error);
        alert("No se puedo recuperar la informacion de la materia.")
      }
    );
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location:Location,
    private facadeService: FacadeService,
    private materiasService:MateriasService,
    private maestrosService:MaestrosService
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

  public actualizar(){
    this.materia['hora_inicio'] = this.hora_inicio.hour;
    this.materia['hora_fin'] = this.hora_fin.hour;
    this.materia['minuto_inicio'] = this.hora_inicio.minute;
    this.materia['minuto_fin'] = this.hora_inicio.minute;
    this.errors = this.materiasService.validarMateria(this.materia);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    this.materiasService.actualizarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia actualizada de manera correcta");
        console.log(response);
        this.router.navigate(['home']);
      },(error)=>{
        alert("No se pudo actualizar la materia");
        console.log(error);
      }
    );
  }

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
        alert("Materia registrado de manera correcta");
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
