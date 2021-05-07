import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthToken } from './interfaces/authToken';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  BASE_URl = 'http://127.0.0.1:8000';
  constructor( private http: HttpClient) { }
  login(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.BASE_URl}/api/login/`, {
      username,
      password
    });
  }
}