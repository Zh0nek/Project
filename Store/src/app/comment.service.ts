import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {Comment} from './interfaces/comment';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  BASE_URl = "http://127.0.0.1:8000/";
  
  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse):any{
    return throwError(error);
  }

  getComments(): Observable<Comment[] | any>{
		return this.http.get<Comment[]>(this.BASE_URl + "api/comments/").pipe(catchError(this.handleError));;//+product_id+"/feedbacks"
	}
  getCommentsByProductId(product_id:number): Observable<Comment[]>{
    let httpParams:HttpParams=new HttpParams().set("product_id",product_id.toString());
    return this.http.get<Comment[]>(this.BASE_URl + "api/comments/",{params:httpParams});
  }
  addComment(title: string, body: string, product_id: number, user_id: number): Observable<Comment> {
    let comment:Comment = {title:title,body:body, product_id:product_id, user_id:user_id} as Comment ; 
		return this.http.post<Comment>(this.BASE_URl + 'api/' + "comments/", comment );
	}
  deleteComment(feedback_id:number): Observable<Comment>{
    console.log("I am here");
    return this.http.delete<Comment>(this.BASE_URl+"api/comments/"+feedback_id+"/");
  }
  updateComment(feedback: Comment): Observable<Comment>{
  return this.http.put<Comment>(this.BASE_URl + "api/comments/" + feedback.id + "/", feedback);
  }
}