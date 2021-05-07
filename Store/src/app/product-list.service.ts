import { Injectable } from '@angular/core';
import { Observable, throwError, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Category} from './interfaces/category';
import {Comment} from './interfaces/comment';
import {Product} from './interfaces/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  BASE_URl = "http://127.0.0.1:8000/";
  PRODUCTS_URL = "http://127.0.0.1:8000/api/products/";

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_URL) ;
  }
  // @ts-ignore
  sort(arr: Product[]): Observable<Product[]>{
    arr.sort((a,b)=>(a.price>b.price)?1:-1)
    return of(arr);
  }
  getProduct(product_id):Observable<Product>{
    return this.http.get<Product> (this.PRODUCTS_URL+product_id+"/");
  }
  getComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.BASE_URl+"api/comments/");
  }
  getCategoryProduct(category:Category): Observable<Product[]>{
    if(category == undefined)
      return this.getProducts();
    return this.http.get<Product[]> ( this.BASE_URl + "api/categories/" + category.id + "/products/");
  }
}