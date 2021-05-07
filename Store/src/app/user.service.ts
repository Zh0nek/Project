import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './interfaces/User';
import { HttpClient} from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URl = "http://127.0.0.1:8000/";
  private usersUrl = 'login'
  constructor(
    private http: HttpClient,
  ) { }
  getUser(username:string): Observable<User>{
    return this.http.get<User>(this.BASE_URl+"api/user/"+username);
  }
}
