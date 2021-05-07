import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Location } from '@angular/common';
import { AuthentificationService } from '../authentification.service';
import { UserService } from '../user.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logged = false;
  username = '';
  user_id:number;
  password = '';

  ngOnInit() { 
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
  }

  constructor(private authentificationService: AuthentificationService,
    private location: Location,
    private userService: UserService) {
  }

  login() {
    this.authentificationService.login(this.username, this.password).subscribe((data) => {
      
      localStorage.setItem('token', data.token);
      this.logged = true;
      
      this.userService.getUser(this.username).subscribe((user)=>{
        localStorage.setItem('user_id', user.id.toString())
      })
      
      this.username = '';
      this.password = '';
    });
    window.location.reload();
  }
  logout() {
    this.username = '';
    this.password = '';
    this.logged = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }
  goBack(): void {
    this.location.back();
  }
}