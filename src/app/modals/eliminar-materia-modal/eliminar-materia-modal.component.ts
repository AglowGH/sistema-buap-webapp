import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-eliminar-materia-modal',
  templateUrl: './eliminar-materia-modal.component.html',
  styleUrls: ['./eliminar-materia-modal.component.scss']
})
export class EliminarMateriaModalComponent implements OnInit{

  public nrc:any;

  constructor(
    private materiasService:MateriasService,
    private dialogRef: MatDialogRef<EliminarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.nrc = this.data.nrc;
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarMateria(){
    this.materiasService.eliminarMateria(this.nrc).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      },(error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }

}
