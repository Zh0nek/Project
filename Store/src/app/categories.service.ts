import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Category} from './interfaces/category';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    BASE_URL = "http://127.0.0.1:8000/";
    Category_URL = "http://127.0.0.1:8000/api/categories/"; 

  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.Category_URL) ;
  }
  getCategory(category_id:number): Observable<Category> {
    return this.http.get<Category>(this.Category_URL+category_id+"/") ;
  }
}
