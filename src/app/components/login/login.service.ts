import { Authorization } from './Authorization.model';
import { map, catchError } from 'rxjs/operators';
import { Login } from './login.model';
import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'https://dev.sitemercado.com.br/api/login'



  constructor(private snackBar: MatSnackBar,
    private http: HttpClient,
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }


    Login(login: Login): Observable<Authorization> 
    {
      let httpHeaders= new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${login.userName}:${login.password}`)
        });
      
        return this.http.post<any>(this.baseUrl,{}, {
              headers : httpHeaders
              },).pipe(      
              map(obj => obj),
              catchError(error => this.errorHandler(error))
              );
    }

  
  
  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro, por favor, tente novamente!', true)
    return EMPTY
  }

}
