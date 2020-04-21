import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productURL = 'api/products/products.json'
    constructor(private http: HttpClient) {

    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productURL).pipe(
            //tap(data => console.log('All: '+ JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
          .pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
          );
      }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            //client side error or network error
            errorMessage = `Ein Fehler ist aufgetreten: ${err.error.message}`;
        } else {
            //backend return unsucessfull
            errorMessage = `Server hat geantwortet mit: ${err.status}, Fehlernachricht: ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}