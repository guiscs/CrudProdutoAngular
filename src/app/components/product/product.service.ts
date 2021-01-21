import { map, catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Response } from './../../Model/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://localhost:44323/api/product'

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

  create(product: Product): Observable<Response> {

    const fd = new FormData();
    fd.append('ImagemUpload', product.imagemUpload, product.imagemUpload.name);
    fd.append('Nome', product.nome);
    fd.append('Valor', product.valor.toString());

    return this.http.post<any>(this.baseUrl, fd).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    );
  }


  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    )
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  update(product: Product): Observable<Response> {

    const fd = new FormData();
    fd.append('Id', product.id.toString());
    fd.append('Nome', product.nome);
    fd.append('Valor', product.valor.toString());

    if (product.imagemUpload !== null)
      fd.append('ImagemUpload', product.imagemUpload, product.imagemUpload?.name);

    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<any>(url, fd).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  delete(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<boolean>(url).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  imageById(id: string): Observable<Response> {
    const url = `${this.baseUrl}/imagem/${id}`;
    return this.http.get<any>(url).pipe(
      map(obj => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro, por favor, tente novamente!', true)
    return EMPTY
  }
}
