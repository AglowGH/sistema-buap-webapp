import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EliminarMateriaModalComponent } from 'src/app/modals/eliminar-materia-modal/eliminar-materia-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-lista-materias-screen',
  templateUrl: './lista-materias-screen.component.html',
  styleUrls: ['./lista-materias-screen.component.scss']
})
export class ListaMateriasScreenComponent implements OnInit{
  
  public rol:string = "";
  public token : string = "";
  public lista_materias: any[] = [];

  displayedColumns: string[] = ['nrc', 'nombre', 'seccion', 'salon', 'programa_educativo', 'profesor_asignado', 'creditos', 'hora_inicio', 'hora_fin','editar','eliminar'];
  dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    public materiasService:MateriasService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    
    this.obtenerLista();
  }

  public obtenerLista(){
    this.materiasService.obtenerMaterias().subscribe(
      (response)=>{
        this.lista_materias = response;
        console.log(response);
        this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
      },(error)=>{
        console.log(error);
        alert("No se puedo obtener la lista de materias");
      }
    );
  }

  public goEditar(nrc:any){}

  public delete(nrc:any){
    const dialogRef = this.dialog.open(
      EliminarMateriaModalComponent,
      {data:{nrc:nrc},
      height: '288px',
      width: '328px'}
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        window.location.reload();
      }else{
        alert("Materia no eliminada ");
        console.log("No se eliminó la materia");
      }
    });

  }

}

export interface DatosMateria {
  nrc: number,
  nombre: string;
  seccion: number;
  salon: string;
  programa_educativo: string;
  profesor_asignado: string;
  creditos: number;
  hora_inicio: number;
  minuto_inicio:number;
  hora_fin:number;
  minuto_fin:number;
  dias:any;
}