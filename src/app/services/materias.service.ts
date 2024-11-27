import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacadeService } from './facade.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { MaestrosService } from './maestros.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  public errors:any=[];

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
    private maestrosService:MaestrosService
  ) { }


  public validarMateria(data:any){
    this.errors = [];
    if(!this.validatorService.required(data['nrc'])){
      this.errors['nrc'] = this.errorService.required;
    }else if(!this.validatorService.max(data['nrc'],6)){
      this.errors['nrc'] = this.errorService.max(6)
    }else if(!this.validatorService.min(data['nrc'],5)){
      this.errors['nrc'] = this.errorService.max(5)
    }

    if(!this.validatorService.required(data['nombre'])){
      this.errors['nombre'] = this.errorService.required;
    }
    if(!this.validatorService.required(data['seccion'])){
      this.errors['seccion'] = this.errorService.required;
    }
    if(!this.validatorService.required(data['salon'])){
      this.errors['salon'] = this.errorService.required;
    }

    if(!this.validatorService.required(data['programa_educativo'])){
      this.errors['programa_educativo'] = this.errorService.required;
    }

    if(!this.validatorService.required(data['profesor_asignado'])){
      this.errors['profesor_asignado'] = this.errorService.required;
    }
    if(!this.validatorService.required(data['creditos'])){
      this.errors['creditos'] = this.errorService.required;
    }

    if(!this.validatorService.validHours(data)){
      this.errors['hora_inicio'] = this.errorService.hour;
    }

    if(!(data['dias'].length > 0) ){
      this.errors['dias'] = this.errorService.required;
    }

    return this.errors;
  }

  public registrarMateria(data:any):Observable<any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.post<any>(`${environment.url_api}/materias/`,data, {headers:headers});
  }
  
}
